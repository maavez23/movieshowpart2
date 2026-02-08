document.getElementById("movieForm").addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    title: title.value,
    language: language.value,
    release_year: release_year.value,
    duration: duration.value,
    rating: rating.value,
    poster: poster.value,
    description: description.value
  };

  try {
    const res = await fetch(`${API_BASE}/api/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message);

    alert("Movie added successfully ✅");
    e.target.reset();

  } catch (err) {
    alert("Error adding movie ❌");
    console.error(err);
  }
});
