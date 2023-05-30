const mongoose = require("mongoose");

const postModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    like: {
      type: Array,
    },
    dislike: {
      type: Array,
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        profile: { type: String },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timeStamps: true }
);

module.exports = mongoose.model("posts", postModel);
