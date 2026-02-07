const express = require("express");
const router = express.Router();

const {
  createBooking,
  getBookings
} = require("../controllers/bookingController");

// USER books ticket
router.post("/", createBooking);

// ADMIN views bookings
router.get("/", getBookings);

module.exports = router;
