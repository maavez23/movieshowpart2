const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

/* ================== API ROUTES ================== */
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

/* ================== HEALTH CHECK ================== */
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ================== FRONTEND ================== */
app.use(express.static(path.join(__dirname, "../frontend")));

/* ✅ FIXED WILDCARD ROUTE (Node 22 SAFE) */
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

module.exports = app;
