const express = require("express");
const router = express.Router();
const {
  RegisterPatient,
  verifyEmail,
  LoginPatient,
} = require("../controller/userController");
// registering a patient route

router.route("/register").post(RegisterPatient);

// logging a patient route

router.route("/login").post(LoginPatient);
router.route("/verify/:token").get(verifyEmail);
module.exports = router;
