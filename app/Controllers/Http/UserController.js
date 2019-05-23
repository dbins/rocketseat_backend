"use strict";

const User = use("App/Models/User");
const UserPreference = use("App/Models/UserPreference");
const Preferences = use("App/Models/Preference");

/**
 * Controle User
 */
class UserController {
  /**
   * Cria um novo usuário na API.
   * POST userpreferences/create
   *

   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    const data = request.only(["username", "email", "password"]);
    try {
      const user = await User.create(data);
      const token = await auth.attempt(data.email, data.password);
      return response.status(201).json({
        message: "Usuário gravado com sucesso!",
        user: user,
        token: token
      });
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .send({ message: "Erro ao tentar inserir um novo usuário" });
    }
  }
  /**
   * Atualiza os dados de um usuário autenticado.
   * POST userpreferences/create
   *

   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({ request, response, auth }) {
    try {
      const user_id = auth.user.id;
      const { username, password, preferences } = request.all();
      const data_user = { username: username };
      if (password) data_user.password = password;

      const user = await User.findByOrFail("id", user_id);

      user.merge(data_user);

      await user.save();

      if (preferences && preferences.length > 0) {
        await UserPreference.query()
          .where("user_id", user_id)
          .delete();

        preferences.forEach(async preference_id => {
          await UserPreference.create({
            user_id: user_id,
            preference_id: preference_id
          });
        });
      }
      //Retornando os dados atualizados!
      const user_updated = await User.findByOrFail("id", user_id);
      const preferences_updated = await UserPreference.query()
        .select("preferences.*")
        .innerJoin(
          "preferences",
          "user_preferences.preference_id",
          "preferences.id"
        )
        .where("user_preferences.user_id", user_id)
        .fetch();
      user_updated.preferences = preferences_updated;

      return response.status(201).json({
        message: "Usuário atualizado com sucesso!",
        user: user_updated
      });
    } catch (err) {
      return response.status(err.status).send({ message: err.message });
    }
  }
  /**
   * Retorna os dados de um usuário autenticado.
   * POST userpreferences/create
   *

   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show({ request, response, auth }) {
    const userId = auth.user.id;
    const user = await User.query()
      .where("id", userId)
      .fetch();

    const findUserPreferences = await UserPreference.query()
      .where("user_id", userId)
      .fetch();

    const IdsUserPreferences = findUserPreferences.rows.map(
      item => item.preference_id
    );

    const preferences = await Preferences.all();

    return response.json({
      user: user.rows[0],
      userPreferences: IdsUserPreferences,
      preferences
    });
  }
}

module.exports = UserController;
