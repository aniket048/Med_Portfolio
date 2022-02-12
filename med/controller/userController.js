const User = require("../models/user");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
exports.RegisterPatient = async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(email);
  const check = await User.findOne({ email: email });
  console.log(check, "i am check");
  if (check) {
    return res
      .status(400)
      .json({ message: "user already registerd . please login to continue" });
  }
  let user = await User.create(req.body);
  const token = user.genrateAuthToken();

  const transporter = await nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const url = `http://127.0.0.1/api/verify/${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: "Verify Acoount",
    html: `Click <a href = ${url}>here</a> to confirm your email.`,
  });

  res.send("verify your email to be able to login");
};

exports.verifyEmail = async (req, res, next) => {
  console.log("verification has been called");

  const jwtPrivatekey = "MysecureKey";
  const payload = await jwt.verify(req.params.token, jwtPrivatekey);
  console.log(payload);
  const user = await User.findOne({ _id: payload.id });
  if (!user) {
    return res.status(401).send("USER_NOT_FOUND");
  }
  console.log(user);
  user.isVerified = true;
  await user.save();
  res.redirect("/");
};

exports.LoginPatient = async (req, res, next) => {
  console.log("loginj is being called");
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new Error("Invalid Usename or Password"));
  }
  if (user.isVerified === false) {
    return next(new Error("please verify your email to proceed"));
  }

  const jwtPrivatekey = "MysecureKey";
  const verifiacation = await user.ComparePassword(password);
  if (!verifiacation) {
    next(new Error("Invalid Usename or Password"));
  }
  res.send("you are logged in");
};
