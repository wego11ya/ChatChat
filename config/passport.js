const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, cb) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return cb(
            null,
            false,
            req.flash("error_messages", "Incorrect email address or password!")
          );
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return cb(
            null,
            false,
            req.flash("error_messages", "Incorrect account or password!")
          );
        }
        return cb(null, user);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    if (user) {
      const userJson = user.toJSON();
      return cb(null, userJson);
    } else {
      return cb(null, false);
    }
  } catch (error) {
    return cb(error);
  }
});

module.exports = passport;
