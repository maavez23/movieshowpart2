const express = require("express");
const multer = require("multer");
const router = express.Router();

const { addShow, getShows } = require("../controllers/showController");

// multer config (no file save needed now)
const upload = multer();

router.post("/admin/shows", upload.none(), addShow);
router.get("/admin/shows", getShows);

module.exports = router;
