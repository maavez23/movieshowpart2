const pool = require("../config/db"); // ✅ ONE DB OBJECT ONLY

// ================= CREATE BOOKING =================
const createBooking = async (req, res) => {
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

    const result = await pool.query(sql, [
      user_id,
      movie_id,
      show_date,
      show_time,
      seats.join(","), // seats stored as text
      total_price
    ]);

    res.json({
      message: "Booking successful",
      booking_id: result.rows[0].id
    });

  } catch (err) {
    console.error("CREATE BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// ================= GET BOOKINGS (ADMIN) =================
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

// ✅ EXPORT BOTH FUNCTIONS
module.exports = {
  createBooking,
  getBookings
};
