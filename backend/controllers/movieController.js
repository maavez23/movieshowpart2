const pool = require("../config/db");

// ================== GET ALL MOVIES ==================
exports.getMovies = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================== ADD MOVIE ==================
exports.addMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      language,
      duration,
      rating,
      release_year,
      poster
    } = req.body;

    await pool.query(
      `
      INSERT INTO movies 
      (title, description, language, duration, rating, release_year, poster)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      `,
      [title, description, language, duration, rating, release_year, poster]
    );

    res.json({ message: "Movie Added" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ================== GET MOVIE BY ID ==================
exports.getMovieById = async (req, res) => {
  try {
    const movieId = req.params.id;

    const result = await pool.query(
      "SELECT * FROM movies WHERE id = $1",
      [movieId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
