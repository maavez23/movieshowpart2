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
    row.innerHTML = `
  <td class="user" data-label="User">${b.user_name || "N/A"}</td>
  <td data-label="Movie">${b.movie_title}</td>
  <td data-label="Date">${new Date(b.show_date).toLocaleDateString()}</td>
  <td data-label="Time">${b.show_time}</td>
  <td class="seats" data-label="Seats">${b.seats}</td>
  <td class="price" data-label="Price">₹${b.total_price}</td>
`;

    });
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "<h3>Failed to load bookings</h3>";
  });
