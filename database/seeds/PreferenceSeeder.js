"use strict";
const Database = use("Database");

/*
|--------------------------------------------------------------------------
| PreferenceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class PreferenceSeeder {
  async run() {
    const data = ["Front-end", "Back-end", "Mobile", "DevOps", "Gestão", "Marketing"];
    for (var x = 0; x < data.length; x++) {
      let registro = await Database.table("preferences").where("name", data[x]);
      if (registro.length == 0) {
        let inserir = await use("Database")
          .table("preferences")
          .insert({ name: data[x] });
        //console.log(inserir); id do registro adicionado!
      }
    }
  }
}

module.exports = PreferenceSeeder;
