"use strict";
const Mail = use("Mail");

class MeetupEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return "MeetupEmail-job";
  }

  // This is where the work is done.
  async handle({ user, meetup, dateFormat, hourFormat, redirectUrl }) {
    console.log("MeetupEmail-job started!");
    console.log(`Job: ${MeetupEmail.key}`);
    await Mail.send(
      ["emails.confirm_meetup"],
      {
        user: user.username,
        meetup: meetup.title,
        date: dateFormat,
        hour: hourFormat,
        link: redirectUrl
      },
      message => {
        message
          .to(user.email)
          .from("bins@dbins.com.br", "Admin | BINS")
          .subject("Confirmação de participação no Meetup!");
      }
    );
  }
}

module.exports = MeetupEmail;
