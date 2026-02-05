const table = document.getElementById("bookingTable");
const token = localStorage.getItem("token");

if (!table) {
  console.error("bookingTable element not found");
}

// ================== FETCH BOOKINGS (ADMIN) ==================
fetch(`${API_BASE}/api/bookings`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to load bookings");
    return res.json();
  })
  .then(data => {
    table.innerHTML = "";

    if (!data || data.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;color:#888;">
            No bookings found
          </td>
        </tr>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    data.forEach(b => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${b.email}</td>
        <td>${b.movie}</td>
        <td>${b.show_date}</td>
        <td>${b.show_time}</td>
        <td>${b.seats}</td>
        <td>₹${b.total_price}</td>
      `;
      fragment.appendChild(tr);
    });

    table.appendChild(fragment);
  })
  .catch(err => {
    console.error("Booking load error:", err);
    table.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center;color:red;">
          Failed to load bookings
        </td>
      </tr>`;
  });
