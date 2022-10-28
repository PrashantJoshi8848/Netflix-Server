const movieModel = require("../models/Movies");

// Post movies
const postMovies = async (req, res) => {
  if (req.user._id) {
    const newmovies = new movieModel(req.body);
    try {
      const result = await newmovies.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "faild to upload movies", error: err });
    }
  } else {
    res.status(403).json({
      Message: "Only admin can add movies",
    });
  }
};

// update movies
const updateMovies = async (req, res) => {
  console.log(req.params);
  if (req.user._id) {
    try {
      const movies = await movieModel.findById(req.params.id);
      Object.assign(movies, req.body);
      const result = await movies.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "faild to upload movies", error: err });
    }
  } else {
    res.status(403).json({
      Message: "Only admin can update movies",
    });
  }
};

// delete Movies By id

const DeleteMovieById = async (req, res) => {
  if (req.user._id) {
    try {
      await movieModel.findByIdAndDelete(req.params.id);
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

// findMoviesByid

const FindMoviesById = async (req, res) => {
  if (!req.params)
    res.status(500).json({
      message: "user Id required",
    });
  if (req.user._id) {
    try {
      const result = await movieModel.findById(req.params.id);
      if (result) {
        res.status(200).json({
          result,
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

// find random movies
const FindRandomMovies = async (req, res) => {
  if (req.user._id) {
    let query = req.query.type;
    let movies;
    if (query === "series") {
      movies = await movieModel.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movies = await movieModel.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }
    res.status(200).json({
      movies,
    });
  } else {
    res.status(400).json({
      message: "require valid token to acces",
    });
  }
};

// get all movies
const GetAllMovies = async (req, res) => {
  if (req.user._id) {
    try {
      const result = await movieModel.find().sort({ createdAt: -1 });
      if (result) {
        res.status(200).json({
          totalMovies: result.length - 1,
          result,
        });
      }
    } catch (err) {
      res.status(404).json({
        message: "faild to get Movies",
      });
    }
  } else {
    res.status(400).json({
      message: "require valid token to acces",
    });
  }
};

module.exports = {
  postMovies,
  updateMovies,
  DeleteMovieById,
  FindMoviesById,
  FindRandomMovies,
  GetAllMovies,
};
