const express = require('express');
const router = express.Router();

// registering a patient route

router.route("/register").post()

// logging a patient route

router.route("/login").post()


//route for getting all prescriptions
router.route("/getalldoctors").get()


//route for getting individual prescriptions 
router.route("/getalldoctors/:id").get()


//route for logging out a patient
router.router("/logout").get()





