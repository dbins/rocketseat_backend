"use strict";
const Antl = use("Antl");

class UserUpdate {
  get rules() {
    return {
      password: "confirmed"
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = UserUpdate;
