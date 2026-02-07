const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/bookingController");
app.get("/api/bookings", getBookings);

router.post("/", createBooking);

module.exports = router;


