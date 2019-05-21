"use strict";
const Antl = use("Antl");

class Subscription {
  get rules() {
    return {
      meetup_id: "required|integer"
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Subscription;
