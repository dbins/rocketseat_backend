"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

//Rotas que não precisa de autenticação
// Route.get('/', () => {
//  return { greeting: 'API MeetApp' }
// })

//Route.post("login", "SessionController.store").validator("Login");
Route.post("login", "SessionController.login").validator("Login");
//Route.post("register", "UserController.store").validator("User");
//Route.post("register", "UserController.store").validator("User");
Route.post("register", "UserController.store").validator("User");

Route.get("/files/:file", "FileController.show");

// Rotas que precisam de autenticação
// Enviar Bearer Token
Route.group(() => {
  Route.get("preferences", "PreferenceController.index");
  Route.post("preferences/save", "PreferenceController.store").validator(
    "Preferences"
  );

  Route.get("profile", "UserController.show");
  Route.put("profile", "UserController.update").validator("UserUpdate");

  Route.post("/files", "FileController.store");
  Route.delete("/files/:id", "FileController.destroy");

  Route.get("dashboard", "MeetupController.index");
  Route.post("meetup/subscription", "MeetupController.subscription").validator(
    "Subscription"
  );
  Route.post("meetup", "MeetupController.store").validator("Meetup");
  Route.get("meetup/:id", "MeetupController.show");

  Route.post(
    "/meetup/confirmation",
    "MeetupController.subscriptionConfirmation"
  ).validator("Confirmation");
}).middleware(["auth"]);
