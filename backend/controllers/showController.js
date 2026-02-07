const pool = require("../database/db");

// ================= ADD SHOW =================
const addShow = async (req, res) => {
  try {
    const { movie_id, show_date, show_time, price, total_seats } = req.body;

    const result = await pool.query(
      `INSERT INTO shows 
       (movie_id, show_date, show_time, price, total_seats, available_seats)
       VALUES ($1, $2, $3, $4, $5, $5)
       RETURNING *`,
      [movie_id, show_date, show_time, price, total_seats]
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

// ================= GET SHOWS =================
const getShows = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        s.id,
        m.title,
        s.show_date,
        s.show_time,
        s.total_seats,
        s.available_seats,
        m.rating
      FROM shows s
      JOIN movies m ON s.movie_id = m.id
      ORDER BY s.show_date, s.show_time
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET SHOWS ERROR:", err);
    res.status(500).json({ message: "Failed to load shows" });
  }
};

// 🔥 MOST IMPORTANT LINE
module.exports = {
  addShow,
  getShows
};
