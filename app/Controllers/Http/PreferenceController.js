"use strict";
const User = use("App/Models/User");
const Preferences = use("App/Models/Preference");
const UserPreference = use("App/Models/UserPreference");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with preferences
 */
class PreferenceController {
  async index({ request, response }) {
    const preferences = await Preferences.all();

    return preferences;
  }

  async store({ request, response, auth }) {
    const user_id = auth.user.id;
    const user = await User.findBy("id", user_id);
    const data = request.only(["preferences"]);
    const preferences_ids = data.preferences;

    preferences_ids.forEach(async preference_id => {
      await UserPreference.create({
        user_id: user_id,
        preference_id: preference_id
      });
    });

    return response
      .status(201)
      .json({ message: "As preferências foram gravadas com sucesso" });
  }
}

module.exports = PreferenceController;
