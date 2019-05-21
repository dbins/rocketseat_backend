"use strict";
const Env = use("Env");
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const controller_file = Env.get("APP_URL") + "/files/";
class Meetup extends Model {
  static get computed() {
    return ["urlimagem"];
  }

  getUrlimagem({ file_id }) {
    return `${controller_file}${file_id}`;
  }

  file() {
    return this.belongsTo("App/Models/File");
  }

  subscriptions() {
    return this.belongsToMany("App/Models/User").pivotModel(
      "App/Models/MeetupUser"
    );
  }

  themes() {
    return this.belongsToMany("App/Models/Preferences").pivotModel(
      "App/Models/MeetupPreference"
    );
  }
}

module.exports = Meetup;
