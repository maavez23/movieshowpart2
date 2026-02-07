const express = require("express");
const router = express.Router();

const { getBookings } = require("../controllers/bookingController");

// ✅ ONLY GET — admin view
router.get("/", getBookings);

module.exports = router;
