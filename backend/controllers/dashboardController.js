const pool = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {
    const bookings = await pool.query("SELECT COUNT(*) FROM bookings");
    const revenue = await pool.query("SELECT COALESCE(SUM(total_price),0) FROM bookings");
    const shows = await pool.query("SELECT COUNT(*) FROM shows");
    const users = await pool.query("SELECT COUNT(*) FROM users");

    res.json({
      totalBookings: Number(bookings.rows[0].count),
      totalRevenue: Number(revenue.rows[0].coalesce),
      activeShows: Number(shows.rows[0].count),
      totalUsers: Number(users.rows[0].count)
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

module.exports = { getDashboardStats };
