const express = require("express");
const userVerify = require("../validator/verifyUserToken");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
  postComment,
} = require("../controllers/postController");

const router = express.Router();

router.post("/", userVerify, createPost);
router.get("/", userVerify, getPost);
router.put("/:id", userVerify, updatePost);
router.delete("/:id", userVerify, deletePost);
router.put("/:id/like", userVerify, likePost);
router.put("/:id/dislike", userVerify, disLikePost);
router.put("/comment/post", userVerify, postComment);

module.exports = router;
