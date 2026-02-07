const table = document.getElementById("bookingTable");
const token = localStorage.getItem("token");

if (!token) {
  document.body.innerHTML = "<h3>Please login as admin</h3>";
  throw new Error("No token found");
}

fetch(`${API_BASE}/api/bookings`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  if (!res.ok) throw new Error("API failed");
  return res.json();
})
.then(data => {
  table.innerHTML = "";

  data.forEach(b => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${b.userName || "N/A"}</td>
      <td>${b.movieName}</td>
      <td>${b.date}</td>
      <td>${b.time}</td>
      <td>${b.seats.join(", ")}</td>
      <td>₹${b.price}</td>
    `;
    table.appendChild(row);
  });
})
.catch(err => {
  console.error(err);
  document.body.innerHTML = "<h3>Unauthorized or API error</h3>";
});
