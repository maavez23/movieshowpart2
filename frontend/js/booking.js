// ================== READ PARAMS ==================
const params = new URLSearchParams(window.location.search);

const movieId = params.get("id");
const showDate = params.get("date");
const showTime = params.get("time");

if (!movieId || !showDate || !showTime) {
  alert("Invalid booking details");
  window.location.href = "index.html";
}

// ================== SHOW INFO ==================
document.getElementById("showDate").innerText = showDate;
document.getElementById("showTime").innerText = showTime;

// ================== SEAT GENERATION ==================
const seatsContainer = document.getElementById("seatsContainer");
const checkoutBtn = document.getElementById("checkoutBtn");

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = 9;
let selectedSeats = [];

rows.forEach(row => {
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  for (let i = 1; i <= cols; i++) {
    const seat = document.createElement("div");
    seat.className = "seat";
    seat.innerText = `${row}${i}`;

    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");

      if (seat.classList.contains("selected")) {
        selectedSeats.push(seat.innerText);
      } else {
        selectedSeats = selectedSeats.filter(s => s !== seat.innerText);
      }

      checkoutBtn.disabled = selectedSeats.length === 0;
    });

    rowDiv.appendChild(seat);
  }

  seatsContainer.appendChild(rowDiv);
});

// ================== CHECKOUT ==================
checkoutBtn.addEventListener("click", async () => {
  if (selectedSeats.length === 0) {
    alert("Please select seats");
    return;
  }

  const bookingData = {
    user_id: 1, // 🔴 TEMP FIX (until JWT decode)
    movie_id: Number(movieId),
    show_date: showDate,
    show_time: showTime,
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
