const express = require("express");
const router = express.Router();

// 🔥 CORRECT IMPORT
const { getBookings } = require("../controllers/bookingController");

// ✅ ONLY GET (admin view)
router.get("/bookings", getBookings);

module.exports = router;
