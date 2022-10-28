const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/User");

const verifiedUser = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      jsonwebtoken.verify(token, process.env.Jwt_secret, (err, value) => {
        if (err) {
          res.status(401).json({ message: "Token not valid" });
        } else {
          req.user = value;
          next();
        }
      });
    } catch ({ message }) {
      res.send(500).send("required Authorizaton");
    }
  }
};

module.exports = verifiedUser;
