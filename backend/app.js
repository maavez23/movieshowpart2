const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

/* ================== MIDDLEWARE ================== */
app.use(cors());
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
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

/* ✅ SPA FALLBACK — NODE 22 SAFE */
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
app.use("/api", require("./routes/showRoutes"));

module.exports = app;
