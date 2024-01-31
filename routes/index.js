const router = require("express").Router();
const passport = require("../config/passport");
const homeController = require("../controllers/home-controller");
const userController = require("../controllers/user-controller");
const socketController = require("../controllers/socket-controller");
const chatController = require("../controllers/chat-controller");
const { authenticated } = require("../middleware/auth");
const { generalErrorHandler } = require("../middleware/error-handler");
const upload = require("../middleware/multer");

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
router.get(
  "/users/current_user/edit",
  authenticated,
  userController.editCurrentUser
);
router.get("/users/current-user", authenticated, userController.getCurrentUser);
router.put(
  "/users/current_user",
  authenticated,
  upload.single("avatar"),
  userController.putCurrentUser
);
router.get("/users/:id", authenticated, userController.getUser);
router.get("/public-chatroom", authenticated, chatController.getPublicChatroom);
router.get("/", homeController.getHomePage);
router.use("/", generalErrorHandler);
module.exports = router;
