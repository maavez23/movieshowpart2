const express = require("express");
const router = express.Router();

const {
  getMovies,
  addMovie,
  getMovieById
} = require("../controllers/movieController");

router.get("/", getMovies);
router.post("/add", addMovie);
router.get("/:id", getMovieById);

module.exports = router;
