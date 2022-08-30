const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/userModel");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id).then((user) => {
    cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strategies
      // clientID:keys.google.clientID,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      //passport callback function
      console.log(profile);

      //check if user already exists in our db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have the user
          console.log("User is ", currentUser);
          cb(null, currentUser);
        } else {
          //if not create user in our db
          new User({
            userName: profile.displayName,
            googleId: profile.id,
            photo: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("New user created:" + newUser);
              cb(null, newUser);
            });
        }
      });
    }
  )
);
