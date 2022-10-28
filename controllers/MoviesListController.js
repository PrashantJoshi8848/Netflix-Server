const ListModel = require("../models/List");

// post movieslist
const PostMoviesList = async (req, res) => {
  if (req.user._id) {
    const moviesList = new ListModel(req.body);
    try {
      const result = await moviesList.save();
      res.status(201).json(result);
    } catch (err) {
      res
        .status(500)
        .json({ message: "faild to createmovie movies", error: err });
    }
  } else {
    res.status(403).json({
      Message: "Only admin can add movies",
    });
  }
};

// Deleted moviesList By id
const DeleteMoviesList = async (req, res) => {
  if (req.user._id) {
    try {
      await ListModel.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: "successfully deleted movies...",
      });
    } catch ({ message }) {
      res.status(500).json({
        message: "faild to delete movies",
        error: message,
      });
    }
  } else {
    res.status(500).send({
      message: "only admin can delete movies",
    });
  }
};

// get moviesList
const GetMoviesList = async (req, res) => {
  if (req.user._id) {
    const { type, genre } = req.query;
    let list = [];
    try {
      if (type) {
        if (genre) {
          list = await ListModel.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: type, genre: genre } },
          ]);
        } else {
          list = await ListModel.aggregate([
            { $sample: { size: 10 } },
            { $match: { type: type } },
          ]);
        }
      } else {
        list = await ListModel.aggregate([{ $sample: { size: 10 } }]);
      }
      res.status(200).json({ list });
    } catch (err) {}
  } else {
    res.status(400).json({
      message: "require valid token to acces",
    });
  }
};
module.exports = { PostMoviesList, DeleteMoviesList, GetMoviesList };
