exports.createBooking = async (req, res) => {
  try {
    let {
      user_id,
      movie_id,
      show_date,
      show_time,
      seats,
      total_price
    } = req.body;

    // 🔴 TEMP FIX (until JWT auth)
    if (!user_id) user_id = 1;

    if (!movie_id || !show_date || !show_time || !seats?.length) {
      return res.status(400).json({ message: "Invalid booking data" });
    }

    const result = await pool.query(
      `
      INSERT INTO bookings 
      (user_id, movie_id, show_date, show_time, seats, total_price)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `,
      [
        user_id,
        movie_id,
        show_date,
        show_time,
        seats.join(","), // ✅ array → string
        total_price
      ]
    );

    res.json({
      message: "Booking successful",
      booking_id: result.rows[0].id
    });

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================== GET ALL BOOKINGS (ADMIN) ==================
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

    const result = await pool.query(sql);

    res.json(result.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};
