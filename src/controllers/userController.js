const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");

const createUser = asyncHandler(async (req, res, next) => {
  const { username, email, password, profile, phonenumber } = req.body;
  const validUser = await userModel.findOne({ email });
  if (validUser) {
    res.status(400).send("user already exist");
  }
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    profile,
    phonenumber,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user.id,
      username,
      email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1day" }
  );
  res.status(200).json({ user, token });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).send("user doesn't exisit");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    res.status(400).send("incorrect password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1day" }
  );

  res.status(200).json({ user, token });
});

//send the  friend request

const followingRequest = asyncHandler(async (req, res, next) => {
  if (req.params.id !== req.body) {
    const user = await userModel.findById(req.params.id);
    const otherUser = await userModel.findById(req.body.user);

    if (!user.followers.includes(req.body.user)) {
      await user.updateOne({ $push: { followers: req.body.user } });
      await otherUser.updateOne({ $push: { following: req.params.id } });
      return res.status(200).send("user has followed");
    } else {
      res.status(400).send("you already follow this user");
    }
  }
});

//fetch post from the followers

const fetchPost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  const followersPost = await Promise.all(
    user.followers.map((item) => {
      return Post.find({ user: item });
    })
  );
  res.status(200).json({ followersPost });
});

//update user profile

const updateProfile = asyncHandler(async (req, res, next) => {
  if (req.params.id === req.user.id) {
    if (req.body.password || req.body.username) {
      const hashPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashPassword;
      const updateUser = await userModel.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updateUser);
    }
  } else {
    res.status(400).json("you are not allow to update the status");
  }
});

//delete the user account

const deleteAccount = asyncHandler(async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    res.status(400).json("account doesn't match");
  }
  await userModel.findByIdAndDelete(req.params.id);
  res.status(200).json("account deleted");
});

//logout
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "").json("logout succcessfully");
});

module.exports = {
  createUser,
  loginUser,
  followingRequest,
  fetchPost,
  updateProfile,
  deleteAccount,
  logout,
};
