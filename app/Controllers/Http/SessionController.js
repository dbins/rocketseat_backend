"use strict";
const User = use("App/Models/User");
const UserPreference = use("App/Models/UserPreference");
const Hash = use("Hash");

class SessionController {
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    const user = await User.findBy("email", email);

    if (!user) {
      return response
        .status(401)
        .json({ message: "O e-mail informado não foi localizado" });
    }

    const isSame = await Hash.verify(password, user.password);

    if (!isSame) {
      return response
        .status(401)
        .json({ message: "A senha ou o Email informados estão incorretos" });
    }

    const token = await auth.attempt(email, password);
	
	const preferences = await UserPreference.query()
      .select("preferences.*")
	  .innerJoin("preferences", "user_preferences.preference_id", "preferences.id")
      .where("user_preferences.user_id", user.id)
	  .fetch();
	user.preferences = preferences;
	return response.status(201).json({
      message: "Login realizado com sucesso",
      token: token.token,
      user: user
    });
  }
}

module.exports = SessionController;
