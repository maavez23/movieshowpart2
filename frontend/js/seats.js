const seatsContainer = document.getElementById("seats");
const countEl = document.getElementById("count");
const totalEl = document.getElementById("total");
const confirmBtn = document.getElementById("confirmBtn");

const seatPrice = 150;
let selectedSeats = [];

// ================== CREATE SEATS ==================
for (let i = 1; i <= 50; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");
  seat.innerText = i; // show seat number

  seat.addEventListener("click", () => {
    if (seat.classList.contains("booked")) return;

    seat.classList.toggle("selected");

    if (seat.classList.contains("selected")) {
      selectedSeats.push(i);
    } else {
      selectedSeats = selectedSeats.filter(s => s !== i);
    }

    updateSummary();
  });

  seatsContainer.appendChild(seat);
}

// ================== UPDATE SUMMARY ==================
function updateSummary() {
  countEl.innerText = selectedSeats.length;
  totalEl.innerText = selectedSeats.length * seatPrice;
}

// ================== CONFIRM BOOKING ==================
confirmBtn.addEventListener("click", async () => {
  if (selectedSeats.length === 0) {
    alert("Please select seats");
    return;
  }

  const bookingData = {
    user_id: 1,              // JWT se aayega later
    movie_id: 1,
    show_date: "2026-02-10",
    show_time: "18:30",
    seats: selectedSeats,
    total_price: selectedSeats.length * seatPrice
  };

  try {
    const res = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Authorization: `Bearer ${token}`  (future)
      },
      body: JSON.stringify(bookingData)
    });

    const data = await res.json();

    alert("Booking successful!");

    // mark seats as booked
    document.querySelectorAll(".seat.selected").forEach(seat => {
      seat.classList.remove("selected");
      seat.classList.add("booked");
    });

    selectedSeats = [];
    updateSummary();

  } catch (err) {
    console.error(err);
    alert("Booking failed");
  }
});
