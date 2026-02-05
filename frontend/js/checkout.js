document.getElementById("checkoutBtn").addEventListener("click", async () => {
  if (!selectedSeats || selectedSeats.length === 0) {
    alert("Please select seats");
    return;
  }

  const bookingData = {
    user_id: 1, // 🔴 TEMP FIX (until JWT decode)
    movie_id: Number(localStorage.getItem("movieId")),
    show_date: localStorage.getItem("showDate"),
    show_time: localStorage.getItem("showTime"),
    seats: selectedSeats,
    total_price: selectedSeats.length * 150
  };

  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
    console.error("BOOKING ERROR:", err);
    alert(err.message || "Booking Failed ❌");
  }
});
