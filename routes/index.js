const router = require("express").Router();
const passport = require("../config/passport");
const homeController = require("../controllers/home-controller");
const userController = require("../controllers/user-controller");
const { generalErrorHandler } = require("../middleware/error-handler");
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.signUp);
router.get("/signin", userController.signInPage);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  userController.signIn
);
router.post("/logout", userController.logout);
router.get("/test", userController.testPage);
router.get("/", homeController.getHomePage);
router.use("/", generalErrorHandler);
module.exports = router;
