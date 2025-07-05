const GoogleStrategy = require("passport-google-oauth20");
const { default: slugify } = require("slugify");
const { user } = require("../db");
const configs = require("../configs");

module.exports = new GoogleStrategy(
  {
    clientID: configs.google.googleClientID,
    clientSecret: configs.google.googleClientSecret,
    callbackURL: `${configs.domain}/auth/google/callback`,
  },
  async (profile, done) => {
    console.log("profile", profile);
    const email = profile.emails[0].value;

    let User = await user.findOne({
      where: {
        email,
      },
    });

    if (User) {
      return done(null, User);
    }

    const name = `${profile.name.givenName} ${profile.name.familyName}`;
    const username =
      slugify(name, { lower: true }).replace(/[\.-]/g, "") +
      Math.floor(1000 + Math.random() * 9000);

    await user.create({
      name,
      username,
      email,
      provider: "google",
    });

    done(null, user);
  }
);
