const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./src/config/dbConfig");
const router = require("./src/routers/main/router");

const app = express();
connectDb();
router(app);

port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
