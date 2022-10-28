const express = require("express");
const app = express();
const cors = require("cors");

// config cors
app.use(cors());

// dot env
require("dotenv").config();

// Db connection
const db = require("./database/DbConnection");
db();

// all routs
const authRoute = require("./routes/auth");
const MoviesRouter = require("./routes/movies");
const MoviesListRoute = require("./routes/MoviesList");
const userRoute = require("./routes/user");

// port
const PORT = process.env.PORT;

// json middleware

app.use(express.json());

// creat auth routes

app.use("/api/auth", authRoute);

// create user routers

app.use("/api/user", userRoute);

// create Movies routes

app.use("/api/movies", MoviesRouter);

// creat movies List

app.use("/api/movies/list", MoviesListRoute);

// port Listening
app.listen(PORT, () => {
  console.log(`port is running on ${PORT}...`);
});
