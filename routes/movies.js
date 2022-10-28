const MoviesRouter = require("express").Router();
const moviesRoute = require("../controllers/MoviesController");
const verifiedUser = require("../middlewares/VerifyToken");

// find all user
MoviesRouter.route("/")
  .post(verifiedUser, moviesRoute.postMovies)
  .get(verifiedUser, moviesRoute.GetAllMovies);

// update movies and delete
MoviesRouter.route("/:id")
  .patch(verifiedUser, moviesRoute.updateMovies)
  .delete(verifiedUser, moviesRoute.DeleteMovieById);

// find movies by id
MoviesRouter.route("/find/:id").get(verifiedUser, moviesRoute.FindMoviesById);

// find Random series,movies
MoviesRouter.route("/random").get(verifiedUser, moviesRoute.FindRandomMovies);

module.exports = MoviesRouter;
