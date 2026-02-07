const db = require("../config/db");

// CREATE BOOKING
exports.createBooking = async (req, res) => {
  try {
    const {
      user_id,
      movie_id,
      show_date,
      show_time,
      seats,
      total_price
    } = req.body;

    const sql = `
      INSERT INTO bookings
      (user_id, movie_id, show_date, show_time, seats, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const result = await db.query(sql, [
      user_id,
      movie_id,
      show_date,
      show_time,
      seats.join(","),
      total_price
    ]);

    res.json({
      message: "Booking successful",
      booking_id: result.rows[0].id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
const pool = require("../database/db");

const getBookings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        b.id,
        m.title AS movie_title,
        b.show_date,
        b.show_time,
        b.seats,
        b.total_price
      FROM bookings b
      JOIN movies m ON b.movie_id = m.id
      ORDER BY b.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("GET BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to load bookings" });
  }
};

module.exports = { getBookings };
