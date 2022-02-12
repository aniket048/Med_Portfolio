const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  roles: {
    type: String,
  },
  isDetail: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.genrateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, verified: this.isVerified },
    "MysecureKey",
    { expiresIn: "1d" }
  );
  return token;
};

UserSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
