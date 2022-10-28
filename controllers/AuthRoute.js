const userModule = require("../models/User");
const jwt = require("jsonwebtoken");

// erroe handel
const handleError = (message) => {
  const error = {
    username: "",
    password: "",
  };
  if (message.code === 11000) {
    error.email = "user aready exist";
    return error;
  } else if (message._message === "user validation failed") {
    Object.values(message.errors).map((err) => {
      const { properties } = err;
      error[properties.path] = properties.message;
    });

    return error;
  } else if (message.message === "password dont match") {
    error.password = "pasword dosn't match";
    return error.password;
  }
};

// handle jwtToken
const generateJwt = async (_id, isAdmin) => {
  return await jwt.sign({ _id, isAdmin }, process.env.Jwt_secret, {
    expiresIn: "5d",
  });
};

// Register user
const Register = async (req, res) => {
  try {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };

    const createdUser = await userModule.create(user);
    if (createdUser) {
      res.status(201).json({
        message: "success",
        user: createdUser,
      });
    }
  } catch (message) {
    console.log(handleError(message));
  }
};

// login user
const Login = async (req, res) => {
  try {
    const result = await userModule.findOne({ email: req.body.email });
    const { password, ...rest } = result._doc;
    if (
      result &&
      (await result.matchpassword(req.body.password, result.password))
    ) {
      res.cookie("jwt", await generateJwt(result._id, result.isAdmin), {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });
      res.status(201).json({
        message: "Login successful",
        result: {
          ...rest,
          jwtToken: await generateJwt(result._id, result.isAdmin),
        },
      });
    } else {
      throw new Error("password dont match");
    }
  } catch (err) {
    let result = handleError(err);
    res.status(400).json(result);
  }
};

module.exports = { Register, Login };
