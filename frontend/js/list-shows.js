// ================== CONFIG ==================
const API_BASE = "http://localhost:3000"; 
// later → https://your-app.onrender.com

const token = localStorage.getItem("token");

// ================== FETCH & DISPLAY ALL MOVIES (ADMIN) ==================
fetch(`${API_BASE}/api/movies`, {
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(async res => {
    if (!res.ok) throw new Error("Failed to load data");
    return res.json();
  })
  .then(movies => {
    const tbody = document.getElementById("showsBody");
    tbody.innerHTML = "";

    if (!movies || movies.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;color:#999;">
            No movies available
          </td>
        </tr>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    movies.forEach(movie => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.description || "-"}</td>
        <td>${movie.language || "-"}</td>
        <td>${movie.duration || "-"}</td>
        <td>${movie.rating || "-"}</td>
        <td>
          <button class="delete-btn" data-id="${movie.id}">
            Delete
          </button>
        </td>
      `;

      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
  })
  .catch(err => {
    console.error("Error loading movies:", err);
    document.getElementById("showsBody").innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;color:red;">
          Failed to load data
        </td>
      </tr>`;
  });

// ================== DELETE MOVIE ==================
document.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    if (!confirm("Are you sure you want to delete this movie?")) return;

    fetch(`${API_BASE}/api/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(async res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        alert("Movie deleted successfully ✅");
        location.reload();
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete movie ❌");
      });
  }
});
