const jwt = require("jsonwebtoken");

const verifyUserToken = (req, res, next) => {
  const token = req.headers.token;

  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(400).send("some error occured");
        req.user = user;
        next();
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = verifyUserToken;
