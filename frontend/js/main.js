// ================== CONFIG ==================
const API_BASE = "http://localhost:3000";
// later → https://your-app.onrender.com

const list = document.getElementById("movieList");

if (!list) {
  console.error("movieList div not found");
}

// ================== LOAD MOVIES ==================
fetch(`${API_BASE}/api/movies`)
  .then(async res => {
    if (!res.ok) throw new Error("Failed to load movies");
    return res.json();
  })
  .then(movies => {
    list.innerHTML = "";

    if (movies.length === 0) {
      list.innerHTML = "<p style='color:white'>No movies available</p>";
      return;
    }

    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      card.innerHTML = `
        <img 
          src="assets/posters/${movie.poster}" 
          class="movie-poster"
          onerror="this.src='assets/posters/hero.jpg'"
        >

        <h3 class="movie-title">${movie.title}</h3>

        <div class="movie-meta">
          ${movie.release_year} • ${movie.language} • ${movie.duration}
        </div>

        <div class="card-footer">
          <button class="buy-btn" data-id="${movie.id}">
            Buy Tickets
          </button>
          <div class="rating">⭐ ${movie.rating}</div>
        </div>
      `;

      fragment.appendChild(card);
    });

    list.appendChild(fragment);
  })
  .catch(err => {
    console.error("Error loading movies:", err);
    list.innerHTML = "<p style='color:red'>Failed to load movies</p>";
  });

// ================== BUY BUTTON ==================
document.addEventListener("click", e => {
  if (e.target.classList.contains("buy-btn")) {
    const movieId = e.target.dataset.id;
    window.location.href = `movie.html?id=${movieId}`;
  }
});
