// find all user

const userModel = require("../models/User");

// find UserById

const FindUserById = async (req, res) => {
  if (!req.params)
    res.status(500).json({
      message: "user Id required",
    });
  if (req.user._id) {
    try {
      const result = await userModel.findById(req.params.id);
      const { password, ...rest } = result._doc;
      if (result) {
        res.status(200).json({
          rest,
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "required valid Id",
      });
    }
  } else {
    res.status(400).json({
      message: "require valid token to acces",
    });
  }
};

//  find all user

const FindAllUser = async (req, res) => {
  const query = req.query.new;
  if (req.user._id) {
    try {
      const user = query
        ? await userModel.find().sort({ createdAt: -1 }).limit(2)
        : await userModel.find();
      res.status(200).json(user);
    } catch ({ err }) {
      res.status(500).json(er);
    }
    res.status().json();
  } else {
    res.status(400).json({
      message: "Only Admin can See all user",
    });
  }
};

// update by ID

const UpdateById = async (req, res) => {
  if (req.user._id === req.params.id || req.user.isAdmin) {
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const updatedUser = await userModel.findById(req.params.id);
      Object.assign(updatedUser, req.body);
      updatedUser.save();
      res.status(201).json({
        message: "successfully Updated",
      });
    } catch ({ message }) {
      console.log(message);
    }
  } else {
    res.status(500).send({
      message: "only admin can Update password",
    });
  }
};

// delete by id
const DeleteById = async (req, res) => {
  if (req.user._id === req.params.id) {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: "successfully deleted account...",
      });
    } catch ({ message }) {
      console.log(message);
    }
  } else {
    res.status(500).send({
      message: "you can Only delete your account",
    });
  }
};

// user states
const FindStats = async (req, res) => {
  const today = new Date();
  const lastyear = today.setFullYear(today.setFullYear() - 1);

  const months = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  try {
    const data = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  FindAllUser,
  UpdateById,
  DeleteById,
  FindUserById,
  FindStats,
};
