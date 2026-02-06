fetch("http://localhost:3000/api/movies/admin/shows")
  .then(res => res.json())
  .then(shows => {
    const tbody = document.getElementById("showsBody");
    tbody.innerHTML = "";

    if (shows.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align:center;color:#888;">
            No shows found
          </td>
        </tr>
      `;
      return;
    }

    shows.forEach(show => {
      tbody.innerHTML += `
        <tr>
          <td>${show.title}</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>${show.rating ?? "N/A"}</td>
        </tr>
      `;
    });
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load shows");
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
