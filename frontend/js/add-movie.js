const form = document.getElementById("movieForm");

form.addEventListener("submit", async e => {
  e.preventDefault();

  const data = {
    title: title.value,
    description: description.value,
    language: language.value,
    duration: duration.value,
    rating: rating.value,
    release_year: release_year.value,
    poster: poster.value   // URL / filename
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
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Error adding movie ❌");
  }
});
