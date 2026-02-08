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
app.use("/api", require("./routes/showRoutes"));  
app.use("/api", require("./routes/dashboardRoutes"));
// ❌ API ERROR HANDLER (STOP HTML ON API ERROR)
app.use("/api", (err, req, res, next) => {
  console.error("API ERROR:", err);
  res.status(500).json({ message: "Internal API Error" });
});


/* ================== FRONTEND ================== */
const frontendPath = path.join(__dirname, "../frontend");
app.use(express.static(frontendPath));

/* ================== SPA FALLBACK (LAST ONLY) ================== */
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;
