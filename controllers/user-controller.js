const bcrypt = require("bcryptjs");
const { getUser } = require("../helpers/auth-helpers");
const { imgurFileHandler } = require("../helpers/file-helpers");
const { User } = require("../models");

const userController = {
  signUpPage: (req, res) => {
    res.render("signup");
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordConfirmation } = req.body;
      if (
        !name?.trim() ||
        !email?.trim() ||
        !password?.trim() ||
        !passwordConfirmation?.trim()
      )
        throw new Error("All fields are required.");
      if (password !== passwordConfirmation)
        throw new Error("Password and confirmation password do not match.");
      const [userByEmail] = await Promise.all([
        User.findOne({ where: { email } }),
      ]);
      if (userByEmail) throw new Error("Email is already registered");
      const user = await User.create({
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
  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.flash("success_messages", "Successfully Logged Out!");
      res.redirect("/signin");
    });
  },
  getCurrentUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(getUser(req).id, {
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (!user) throw new Error("User not found.");
      return res.render("users/profile", { user });
    } catch (error) {
      next(error);
    }
  },
  editCurrentUser: async (req, res, next) => {
    try {
      const currentUser = await User.findByPk(getUser(req).id, {
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (!currentUser) throw new Error("User not found.");
      return res.render("users/edit", { currentUser });
    } catch (error) {
      next(error);
    }
  },
  putCurrentUser: async (req, res, next) => {
    try {
      const { name, email, password, introduction } = req.body;
      const currentUser = await User.findByPk(getUser(req).id);
      const { file } = req;
      const avatarFilePath = await imgurFileHandler(file);
      if (!currentUser) throw new Error("User not found.");
      const updatedUser = await currentUser.update({
        name,
        email,
        password: password
          ? bcrypt.hashSync(password, 10)
          : currentUser.password,
        introduction,
        avatar: avatarFilePath || currentUser.avatar,
      });
      req.flash("success_messages", "Successfully updated profile!");
      return res.redirect(`/users/current-user`);
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const id = getUser(req).id;
      const user = await User.findByPk(req.params.id, {
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      if (!user) throw new Error("User not found.");
      return res.render("users/profile", { user });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = userController;
