const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  googleId: String,
  photo: String,
});

module.exports = mongoose.model("User", userSchema);
