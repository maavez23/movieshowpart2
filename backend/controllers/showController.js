const pool = require("../config/db");
// ADD SHOW
const addShow = async (req, res) => {
  try {
    const {
      movie_id,
      language,
      show_date,
      show_time,
      price,
      total_seats
    } = req.body;

    const result = await pool.query(
      `INSERT INTO shows 
      (movie_id, language, show_date, show_time, price, total_seats, available_seats)
      VALUES ($1,$2,$3,$4,$5,$6,$6)
      RETURNING *`,
      [movie_id, language, show_date, show_time, price, total_seats]
    );

    res.status(201).json({
      message: "Show added successfully",
      show: result.rows[0]
    });

  } catch (err) {
    console.error("ADD SHOW ERROR:", err);
    res.status(500).json({ message: "Failed to add show" });
  }
};

// GET SHOWS (ADMIN)
const getShows = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, m.title
      FROM shows s
      JOIN movies m ON s.movie_id = m.id
      ORDER BY s.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET SHOWS ERROR:", err);
    res.status(500).json({ message: "Failed to load shows" });
  }
};

module.exports = { addShow, getShows };
