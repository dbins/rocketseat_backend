"use strict";

const User = use("App/Models/User");
const UserPreference = use("App/Models/UserPreference");
const Meetup = use("App/Models/Meetup");
const MeetupUser = use("App/Models/MeetupUser");
const MeetupPreference = use("App/Models/MeetupPreference");
const moment = use("moment");
const Kue = use("Kue");
const Job = use("App/Jobs/MeetupEmail");
const Env = use("Env");

/**
 * Resourceful controller for interacting with meetups
 */
class MeetupController {
  async index({ request, response, auth }) {
    const user_id = auth.user.id;
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const { s } = request.get(); // parametro para filtro pelo titulo do meetup
    const whereLikeTitle = s && s !== "" ? `meetups.title LIKE '%${s}%' ` : "";

    const controller_file = Env.get("APP_URL") + "/files/";
    const field_file = controller_file + " + meetups.file_id as url_imagem";

    const nextMeetups = await Meetup.query()
      .select("meetups.*")
      .with("file")
      .where("datetime", ">", now)
      .whereDoesntHave("subscriptions", builder => {
        builder.where("user_id", user_id);
      })
      .orderBy("datetime", "ASC")
      .withCount("subscriptions")
      .fetch();
    const subscriptions = await Meetup.query()
      .select("meetups.*")
      .with("file")
      .leftJoin("meetup_users", "meetup_users.meetup_id", "meetups.id")
      .where("datetime", ">", now)
      .where("meetup_users.user_id", user_id)
      .orderBy("datetime", "ASC")
      .withCount("subscriptions")
      .fetch();

    const preferences = await UserPreference.query()
      .where("user_id", user_id)
      .fetch();

    const user_preferences = preferences.rows.map(objPreference => {
      return objPreference.preference_id;
    });

    const nextRecommended = await Meetup.query()
      .select("meetups.*")
      .with("file")
      .leftJoin("meetup_users", "meetup_users.meetup_id", "meetups.id")
      .leftJoin(
        "meetup_preferences",
        "meetup_preferences.meetup_id",
        "meetups.id"
      )
      .where("datetime", ">", now)
      .whereRaw("(meetup_users.user_id IS NULL OR meetup_users.user_id <> ?)", [
        user_id
      ])
      .whereDoesntHave("subscriptions", builder => {
        builder.where("user_id", user_id);
      })
      .whereIn("meetup_preferences.preference_id", user_preferences)
      .groupBy("meetups.id")
      .orderBy("datetime", "ASC")
      .withCount("subscriptions")
      .fetch();

    const searchMeetups = await Meetup.query()
      .select("meetups.*")
      .with("file")
      .where("datetime", ">", now)
      .whereDoesntHave("subscriptions", builder => {
        builder.where("user_id", user_id);
      })
      .whereRaw(whereLikeTitle)
      .orderBy("datetime", "ASC")
      .withCount("subscriptions")
      .fetch();

    return response.status(200).json({
      nextMeetups: nextMeetups.toJSON(),
      subscriptions: subscriptions.toJSON(),
      nextRecommended: nextRecommended.toJSON(),
      search: searchMeetups.toJSON()
    });
  }

  async store({ request, response }) {
    try {
      const data = request.only([
        "title",
        "description",
        "location",
        "datetime",
        "file_id"
      ]);

      if (data.file_id === 0) {
        return response
          .status(401)
          .json({ message: "Selecione uma imagem de capa para este meetup" });
      }

      const meetup = await Meetup.create(data);

      const dataPreferences = request.only(["preferences"]);
      const preferences = dataPreferences.preferences;

      if (preferences && preferences.length > 0) {
        preferences.forEach(async preference_id => {
          await MeetupPreference.create({
            meetup_id: meetup.id,
            preference_id: preference_id
          });
        });
      }

      meetup.file_id = parseInt(meetup.file_id);

      return response
        .status(200)
        .json({ message: "Meetup cadastrado com sucesso!", data: meetup });
    } catch (err) {
      //console.log(err);
      return response
        .status(500)
        .send({ message: "Houve um problema ao gravar este meetup" });
    }
  }

  async show({ params, request, response, auth }) {
    const meetup = await Meetup.query()
      .where("id", params.id)
      .with("file")
      .withCount("subscriptions")
      .fetch();

    const checkSubscription = await MeetupUser.query()
      .where("meetup_id", params.id)
      .where("user_id", auth.user.id)
      .fetch();
    const subscription = checkSubscription.rows.length > 0;
    if (meetup.rows[0]) {
      if (meetup.rows[0].file_id) {
        meetup.rows[0].urlimagem =
          Env.get("APP_URL") + "/files/" + meetup.rows[0].file_id;
      }
    }
    return response.status(200).json({ meetup, subscription });
  }

  async subscription({ request, response, auth }) {
    const user_id = auth.user.id;
    const { meetup_id } = request.only(["meetup_id"]);

    const user = await User.find(user_id);

    if (!user) {
      return response.status(401).json({ message: "Usuário não localizado" });
    }
    const meetup = await Meetup.find(meetup_id);
    if (!meetup) {
      return response.status(401).json({ message: "Meetup não localizado" });
    }

    const checkSubscription = await MeetupUser.query()
      .where("user_id", user_id)
      .where("meetup_id", meetup_id)
      .fetch();

    if (checkSubscription.rows.length > 0) {
      return response
        .status(401)
        .json({ message: "Você já estava inscrito neste meetup" });
    }

    await MeetupUser.create({ meetup_id: meetup_id, user_id: user_id });

    const dateFormat = moment(meetup.datetime).format("DD/MM/YYYY");
    const hourFormat = moment(meetup.datetime).format("HH:mm");
    //const redirectUrl = `${request.input("redirect_url")}`;
    const redirectUrl = "http://www.dbins.com.br";
    const job = Kue.dispatch(
      Job.key,
      { user, meetup, dateFormat, hourFormat, redirectUrl },
      { attempts: 3 }
    );

    //Apenas para testes!
    //job.on("failed attempts", (messageError, doneAttempts) => {
    //  console.log(messageError);
    //  console.log(doneAttempts);
    //});
    //job.on("failed", messageError => {
    //  console.log(messageError);
    //});
    //job.on("complete", result => {
    //  console.log(result);
    //});

    return response
      .status(200)
      .json({ message: "Sua inscrição foi registrada com sucesso!" });
  }

  async subscriptionConfirmation({ request, response, auth }) {
    const data = request.only(["meetup_id"]);

    const meetup = await Meetup.query()
      .where("id", data.meetup_id)
      .with("file")
      .fetch();

    await MeetupUser.query()
      .where("meetup_id", data.meetup_id)
      .where("user_id", auth.user.id)
      .update({ confirmation: 1 });

    return response.json({
      meetup: meetup.rows[0],
      message: "Confirmação enviada com sucesso"
    });
  }
}

module.exports = MeetupController;
