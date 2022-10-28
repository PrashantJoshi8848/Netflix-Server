const mongoose = require("mongoose");
const MoviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
      minlength: [30, "Must have 30 words"],
    },
    img: {
      type: String,
    },
    imgTitle: {
      type: String,
      default: "",
    },
    imgSm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const movieModel = mongoose.model("movie", MoviesSchema);

module.exports = movieModel;
