const table = document.getElementById("bookingTable");
const token = localStorage.getItem("token");

if (!token) {
  document.body.innerHTML = "<h3>Please login as admin</h3>";
  throw new Error("No token found");
}
fetch(`${API_BASE}/api/bookings`)
  .then(res => {
    if (!res.ok) throw new Error("API failed");
    return res.json();
  })
  .then(data => {
    console.log("Bookings:", data);

    const table = document.getElementById("bookingTable");
    table.innerHTML = "";

    if (!data || data.length === 0) {
      table.innerHTML = `
        <tr>
          <td colspan="6" style="text-align:center;">No bookings found</td>
        </tr>
      `;
      return;
    }

    data.forEach(b => {
table.innerHTML += `
        <tr>
          <td>${b.user_name || "N/A"}</td>
          <td>${b.movie_title}</td>
          <td>${b.show_date}</td>
          <td>${b.show_time}</td>
          <td>${b.seats}</td>
          <td>₹${b.total_price}</td>
        </tr>
      `;

    });
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "<h3>Failed to load bookings</h3>";
  });
