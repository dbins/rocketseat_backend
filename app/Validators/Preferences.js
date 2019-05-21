"use strict";
const Antl = use("Antl");

class Preferences {
  get rules() {
    return {
      preferences: "required|array"
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Preferences;
