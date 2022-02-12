const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 80;
const app = express();
const UserRoutes = require("./routes/Userroutes");
const Error = require("./middleware/err");
const cookieParser = require("cookie-parser");
const { isAuthenticatedUser } = require("./middleware/auth");
// template engine setup
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(Error);
app.use(cookieParser());
require("dotenv").config();

app.use("/public", express.static("./public/"));
app.use("/api", UserRoutes);

mongoose
  .connect(
    "mongodb+srv://pranav:loginform@cluster0.rshhz.mongodb.net/Med-folio?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch(() => {
    console.log("Failed to connect to the database");
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signuppage", (req, res) => {
  res.render("login");
});
app.get("/patientpage", isAuthenticatedUser, (req, res) => {
  res.render("patient");
});
