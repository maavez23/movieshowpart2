// ================== CONFIG ==================
const API_BASE = "http://localhost:3000"; 
// later → https://your-app.onrender.com

document.getElementById("checkoutBtn").addEventListener("click", async () => {
  if (!selectedSeats || selectedSeats.length === 0) {
    alert("Please select seats");
    return;
  }

  const bookingData = {
    movie_id: localStorage.getItem("movieId"),
    show_date: localStorage.getItem("showDate"),
    show_time: localStorage.getItem("showTime"),
    seats: selectedSeats,
    total_price: selectedSeats.length * 150
  };

  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Booking failed");
    }

    alert("Booking Successful 🎉");
    window.location.href = "success.html";

  } catch (err) {
    console.error(err);
    alert(err.message || "Booking Failed ❌");
  }
});
