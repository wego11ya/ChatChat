const bcrypt = require("bcryptjs");
const { User } = require("../models");
const userController = {
  signUpPage: (req, res) => {
    res.render("signup");
  },
  signUp: async (req, res, next) => {
    try {
      const { account, name, email, password, passwordConfirmation } = req.body;
      if (
        !account?.trim() ||
        !name?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !passwordConfirmation?.trim()
      )
        throw new Error("All fields are required.");
      if (password !== passwordConfirmation)
        throw new Error("Password and confirmation password do not match.");
      const [userByEmail, userByAccount] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { account } }),
      ]);
      if (userByEmail) throw new Error("Email is already registered");
      if (userByAccount) throw new Error("Account is already registered.");
      const user = await User.create({
        account,
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      });
      res.redirect("/signin");
    } catch (error) {
      next(error);
    }
  },
  signInPage: (req, res) => {
    res.render("signin");
  },
  signIn: (req, res) => {
    req.flash("success_messages", "Successfully Logged In!");
    res.redirect("/");
  },
  logout: (req, res) => {
    req.flash("success_messages", "Successfully Logged Out!");
    req.logout();
    res.redirect("/signin");
  },
  testPage: (req, res) => {
    res.render("test");
  },
};
module.exports = userController;
