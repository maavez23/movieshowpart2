const express = require("express");
const router = express.Router();

const { addShow } = require("../controllers/showController");

router.get("/admin/shows", getShows);
router.post("/admin/shows", addShow);
router.delete("/admin/shows/:id", deleteShow);

module.exports = router;
