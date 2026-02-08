const pool = require("../config/db");


/* ================= ADD MOVIE ================= */
const addMovie = async (req, res) => {
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

    if (!title || !language || !release_year) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const result = await pool.query(
      `INSERT INTO movies 
      (title, description, language, duration, rating, release_year, poster)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *`,
      [title, description, language, duration, rating, release_year, poster]
    );

    res.status(201).json({
      message: "Movie added successfully",
      movie: result.rows[0]
    });

  } catch (err) {
    console.error("ADD MOVIE ERROR:", err);
    res.status(500).json({ message: "Failed to add movie" });
  }
};

/* ================= LIST MOVIES ================= */
const getMovies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM movies ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

module.exports = { addMovie, getMovies };
