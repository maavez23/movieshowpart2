const express = require("express");
const router = express.Router();

const { addMovie, getMovies } = require("../controllers/movieController");

// ADD MOVIE
router.post("/", addMovie);

// LIST MOVIES
router.get("/", getMovies);

module.exports = router;
