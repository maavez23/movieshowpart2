const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ================== API ROUTES (ALWAYS FIRST) ================== */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/movies", require("./routes/movieRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api", require("./routes/showRoutes"));   // 🔥 VERY IMPORTANT

/* ================== FRONTEND ================== */
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

/* ================== SPA FALLBACK (LAST ONLY) ================== */
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
