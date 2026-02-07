const express = require("express");
const router = express.Router();

// 🔥 EXACT IMPORT
const { addShow, getShows } = require("../controllers/showController");

// ROUTES
router.post("/admin/shows", addShow);
router.get("/admin/shows", getShows);

module.exports = router;
