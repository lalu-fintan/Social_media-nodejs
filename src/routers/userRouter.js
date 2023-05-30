const express = require("express");
const verifyUser = require("../validator/verifyUserToken");
const {
  createUser,
  loginUser,
  followingRequest,
  fetchPost,
  updateProfile,
  deleteAccount,
  logout,
} = require("../controllers/userController");

const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/following/:id", verifyUser, followingRequest);
router.get("/followers/:id", verifyUser, fetchPost);
router.put("/update/:id", verifyUser, updateProfile);
router.delete("/delete/:id", verifyUser, deleteAccount);
router.post("/logout", verifyUser, logout);

module.exports = router;
