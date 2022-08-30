const passport = require("passport");

const router = require("express").Router();

//auth login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  // res.send("Logging out");
  req.logout();
  res.redirect("/");
});

//auth with google
// router.get("/google", (req, res) => {
//   //handle with passport
//   res.send("Logging in with google");
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//callback route for google to redirect to

// router.get("/google/callback", passport.authenticate("google"), (req, res) => {
//   // res.send("You reached the callback URI");
//   res.send(req.user);
// });
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    //Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

module.exports = router;
