


const express = require("express");
const userController = require("../controllers/usersController");


const router = express.Router();

// authentication
router.route("/login").post(userController.login);

router.route("/signup").post(userController.signup);
router.route("/").patch(userController.protect, userController.updateUser);

router.route("/cur-user").get(userController.protect, userController.getCurUser);

router.route("").patch(userController.protect, userController.updateUser, userController.updatePassword)
module.exports = router;