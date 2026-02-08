fetch(`${API_BASE}/api/admin/dashboard`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("totalBookings").innerText = data.totalBookings;
    document.getElementById("totalRevenue").innerText = "₹" + data.totalRevenue;
    document.getElementById("activeShows").innerText = data.activeShows;
    document.getElementById("totalUsers").innerText = data.totalUsers;
  })
  .catch(err => {
    console.error("Dashboard error:", err);
  });
