const router = require("express").Router();
const homeController = require("../controllers/home-controller");
const userController = require("../controllers/user-controller");
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.signUp);
router.get("/test", userController.testPage);
router.get("/", homeController.getHomePage);
module.exports = router;
