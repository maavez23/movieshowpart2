const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.get("/api/bookings", getBookings);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("DB HOST:", process.env.DB_HOST);
});
