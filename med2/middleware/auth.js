const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("i am in errror of token not found");
    return next(new Error("Please LogIn to aceess this feature "));
  }

  const decodedData = jwt.verify(token, "MysecureKey");

  req.user = await User.findById(decodedData.id);
  console.log(" i am done");
  next();
};
