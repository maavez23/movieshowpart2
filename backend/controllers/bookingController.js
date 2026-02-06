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

// GET ALL BOOKINGS (ADMIN)
exports.getAllBookings = async (req, res) => {
  try {
    const sql = `
      SELECT 
        bookings.id,
        users.email,
        movies.title AS movie,
        bookings.show_date,
        bookings.show_time,
        bookings.seats,
        bookings.total_price
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN movies ON bookings.movie_id = movies.id
      ORDER BY bookings.booking_time DESC
    `;

    const result = await db.query(sql);
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
