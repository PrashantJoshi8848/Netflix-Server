const verifiedUser = require("../middlewares/VerifyToken");
const MoviesListRoute = require("express").Router();
const MoviesList = require("../controllers/MoviesListController");

// post moviesList
MoviesListRoute.route("/")
  .post(verifiedUser, MoviesList.PostMoviesList)
  .get(verifiedUser, MoviesList.GetMoviesList);

//   delted MovieList By id
MoviesListRoute.route("/:id").delete(verifiedUser, MoviesList.DeleteMoviesList);

module.exports = MoviesListRoute;
