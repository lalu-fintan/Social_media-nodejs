const express = require("express");
const userRouter = require("../userRouter");
const postRouter = require("../postRouter");

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/user", userRouter);
  app.use("/post", postRouter);
};
