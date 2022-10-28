const authRoute = require("express").Router();
const Authroute = require("../controllers/AuthRoute");

authRoute.route("/register").post(Authroute.Register);
authRoute.route("/login").post(Authroute.Login);

module.exports = authRoute;
