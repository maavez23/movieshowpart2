// ================== CONFIG ==================
const API_BASE = "http://localhost:3000";
// later → https://your-app.onrender.com

// ================== IMAGE PREVIEW ==================
const posterInput = document.getElementById("posterInput");
const preview = document.getElementById("preview");
const form = document.getElementById("addShowForm");

if (posterInput) {
  posterInput.addEventListener("change", () => {
    const file = posterInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

// ================== ADD SHOW FORM SUBMIT ==================
if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    const movieId = document.getElementById("movie").value;
    const language = document.getElementById("language").value;
    const showDate = document.getElementById("date").value;
    const showTime = document.getElementById("time").value;
    const price = document.getElementById("price").value;
    const totalSeats = document.getElementById("seats").value;
    const poster = posterInput?.files[0];

    if (!movieId || !showDate || !showTime || !price || !totalSeats) {
      alert("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("movie_id", movieId);
    formData.append("language", language);
    formData.append("show_date", showDate);
    formData.append("show_time", showTime);
    formData.append("price", price);
    formData.append("total_seats", totalSeats);
    if (poster) formData.append("poster", poster);

    try {
      const res = await fetch(`${API_BASE}/api/admin/shows`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add show");
      }

      alert("Show added successfully ✅");
      form.reset();
      preview.style.display = "none";

    } catch (err) {
      console.error("Add show error:", err);
      alert(err.message || "Error adding show ❌");
    }
  });
}
