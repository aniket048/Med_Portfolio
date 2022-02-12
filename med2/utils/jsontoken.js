const User = require("../models/user");

exports.sendToken = (user, res) => {
  const token = user.generateAuthToken();
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  res.cookie("token", token, options);
};
