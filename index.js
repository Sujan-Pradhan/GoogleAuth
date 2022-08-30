const express = require("express");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const passportSetup = require("./config/passport-setup");
const DB = require("./database/connection");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

//set up view engine
app.set("view engine", "ejs");

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//set up routes
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

//create home routes
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening connected to port ${port}`);
});
