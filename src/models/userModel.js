const mongoose = require("mongoose");

const userShema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    followers: {
      type: Array,
    },
    followings: {
      type: Array,
    },
    phonenumber: {
      type: Number,
      required: true,
    },
    profile: {
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("user", userShema);
