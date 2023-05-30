const postModel = require("../models/postModel");
const asyncHandler = require("express-async-handler");

//create post
const createPost = asyncHandler(async (req, res, next) => {
  const { title, image, video } = req.body;

  const post = await postModel.create({
    title,
    image,
    video,
    user: req.user.id,
  });
  res.status(200).json({ post });
});

//get the post data

const getPost = asyncHandler(async (req, res, next) => {
  const { id } = req.user;

  const post = await postModel.find({ user: id });
  if (!post) {
    res.status(400).send("you don't have post");
  }
  res.status(200).json({ post });
});

//update post

const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await postModel.findById(id);
  if (!post) {
    res.status(400).send("you don't have post");
  }

  const update = await postModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ update });
});

//delete the post

const deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findById(id);
  if (!post) {
    res.status(400).send("you don't have post");
  }
  const remove = await postModel.findByIdAndRemove(req.params.id, req.body);
  res.status(200).send("post has been deleted");
});

//like post

const likePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  console.log(post.like);
  if (!post.like.includes(req.user.id)) {
    if (post.dislike.includes(req.user.id)) {
      await post.updateOne({ $push: { like: req.user.id } });
    }
    await post.updateOne({ $pull: { dislike: req.user.id } });
    res.status(200).json("post has been liked");
  } else {
    await post.updateOne({ $push: { like: req.user.id } });
    res.status(200).json("post has been liked");
  }
});

//dislike post

const disLikePost = asyncHandler(async (req, res, next) => {
  const post = await postModel.findById(req.params.id);
  console.log(post.dislike);
  if (!post.dislike.includes(req.user.id)) {
    if (post.like.includes(req.user.id)) {
      await post.updateOne({ $push: { dislike: req.user.id } });
    }
    await post.updateOne({ $pull: { like: req.user.id } });
    res.status(200).json("post has been disliked");
  } else {
    await post.updateOne({ $push: { dislike: req.user.id } });
    res.status(200).json("post has been dislike");
  }
});

//comment post

const postComment = asyncHandler(async (req, res, next) => {
  const { comment, postid } = req.body;
  const comments = {
    user: req.user.id,
    username: req.user.username,
    comment,
  };
  const post = await postModel.findById(postid);
  post.comments.push(comments);
  await post.save();
  res.status(200).json(post);
});

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
  postComment,
};
