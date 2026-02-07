const express = require("express");
const router = express.Router();

const { addShow, getShows } = require("../controllers/showController");

router.post("/admin/shows", addShow);
router.get("/admin/shows", getShows);

module.exports = router;
