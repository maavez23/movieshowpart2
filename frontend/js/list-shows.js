// ================== FETCH SHOWS ==================
fetch(`${API_BASE}/api/admin/shows`)
  .then(res => {
    if (!res.ok) throw new Error("API failed");
    return res.json();
  })
  .then(shows => {
    const tbody = document.getElementById("showsBody");
    tbody.innerHTML = "";

    if (!shows || shows.length === 0) {
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
          <td>${show.title || "N/A"}</td>
          <td>${show.show_date || "-"}</td>
          <td>${show.show_time || "-"}</td>
          <td>${show.total_seats || "-"}</td>
          <td>${show.rating ?? "N/A"}</td>
        </tr>
      `;
    });
  })
  .catch(err => {
    console.error(err);
    alert("Failed to load shows");
  });


// ================== DELETE SHOW (ADMIN) ==================
document.addEventListener("click", e => {
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    if (!confirm("Are you sure you want to delete this show?")) return;

    fetch(`${API_BASE}/api/admin/shows/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => {
        alert("Show deleted successfully ✅");
        location.reload();
      })
      .catch(err => {
        console.error("Delete error:", err);
        alert("Failed to delete show ❌");
      });
  }
});
