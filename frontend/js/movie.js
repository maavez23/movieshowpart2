// ================== GET MOVIE ID ==================
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  alert("Invalid movie");
  window.location.href = "index.html";
}

// ================== DOM ELEMENTS ==================
const posterEl = document.getElementById("poster");
const titleEl = document.getElementById("title");
const metaEl = document.getElementById("meta");
const descEl = document.getElementById("desc");

const buyBtn = document.querySelector(".buy-btn");
const bookingContainer = document.querySelector(".booking-container");

const datesContainer = document.getElementById("datesContainer");
const prevBtn = document.getElementById("prevDate");
const nextBtn = document.getElementById("nextDate");

const bookNowBtn = document.getElementById("bookNowBtn");

// ================== STATE ==================
let selectedDate = null;
let selectedTime = null;

// ================== FETCH MOVIE ==================
fetch(`${API_BASE}/api/movies/${movieId}`)
  .then(async res => {
    if (!res.ok) throw new Error("Movie not found");
    return res.json();
  })
  .then(movie => {
    posterEl.src = `assets/posters/${movie.poster}`;
    titleEl.innerText = movie.title;

    metaEl.innerHTML = `
      ${movie.release_year} &bull;
      ${movie.language} &bull;
      ${movie.duration} &bull;
      ⭐ ${movie.rating}
    `;

    descEl.innerText = movie.description;
  })
  .catch(() => {
    alert("Unable to load movie");
    window.location.href = "index.html";
  });

// ================== SHOW BOOKING ==================
buyBtn.addEventListener("click", () => {
  bookingContainer.style.display = "block";
  bookingContainer.scrollIntoView({ behavior: "smooth" });
});

// ================== DATE LOGIC ==================
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const today = new Date();
let startIndex = 0;
let selectedIndex = 0;

const visibleDays = 5;
const maxDaysAhead = 14;

function renderDates() {
  datesContainer.innerHTML = "";

  for (let i = startIndex; i < startIndex + visibleDays && i < maxDaysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const card = document.createElement("div");
    card.className = "date-card";
    if (i === selectedIndex) card.classList.add("active");

    card.innerHTML = `
      <span>${date.getDate()}</span>
      <small>${monthNames[date.getMonth()]}</small>
    `;

    card.addEventListener("click", () => {
      selectedIndex = i;
      selectedDate = new Date(today);
      selectedDate.setDate(today.getDate() + i);
      renderDates();
      checkReady();
    });

    datesContainer.appendChild(card);
  }

  prevBtn.disabled = startIndex === 0;
  nextBtn.disabled = startIndex + visibleDays >= maxDaysAhead;
}

// ================== ARROWS ==================
prevBtn.onclick = () => {
  if (startIndex > 0) {
    startIndex--;
    renderDates();
  }
};

nextBtn.onclick = () => {
  if (startIndex + visibleDays < maxDaysAhead) {
    startIndex++;
    renderDates();
  }
};

// ================== TIME SELECT ==================
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("time-slot")) {
    document.querySelectorAll(".time-slot")
      .forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active");
    selectedTime = e.target.innerText;
    checkReady();
  }
});

// ================== BOOK BUTTON ENABLE ==================
function checkReady() {
  bookNowBtn.disabled = !(selectedDate && selectedTime);
}

// ================== REDIRECT ==================
bookNowBtn.addEventListener("click", () => {
  if (!selectedDate || !selectedTime) {
    alert("Please select date & time");
    return;
  }

  const query = new URLSearchParams({
    id: movieId,
    date: selectedDate.toISOString().split("T")[0],
    time: selectedTime
  });

  window.location.href = `booking.html?${query.toString()}`;
});

// ================== INIT ==================
renderDates();
