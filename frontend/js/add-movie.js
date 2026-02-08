const form = document.getElementById("movieForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: title.value.trim(),
    description: description.value.trim(),
    language: language.value.trim(),
    duration: duration.value.trim(),
    rating: rating.value ? Number(rating.value) : null,
    release_year: Number(release_year.value),
    poster: poster.value.trim()
  };

  try {
    const res = await fetch(`${API_BASE}/api/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message || "Failed to add movie");
    }

    alert("Movie added successfully ✅");
    form.reset();

  } catch (err) {
    console.error(err);
    alert("Error adding movie ❌");
  }
});

