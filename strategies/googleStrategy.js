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
  async (accessToken, refreshToken, profile, done) => {

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
    const userName = slugify(name, { lower: true }).replace(/[\.-]/g, "") +
      Math.floor(1000 + Math.random() * 9000);

    const newUser = await user.create({
      name,
      userName,
      avatar: profile._json.picture,
      email,
      provider: "google",
    });
    User = newUser;
    return done(null, User);
  }
);
