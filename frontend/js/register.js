function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!name || !email || !password) {
    msg.style.color = "red";
    msg.innerText = "Please fill all fields";
    return;
  }

  fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(async res => {
      const data = await res.json();
      if (!res.ok) throw data;
      return data;
    })
    .then(() => {
      msg.style.color = "#2ecc71";
      msg.innerText = "Registered successfully! Redirecting...";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText =
        err.message || "Email already registered";
    });
}
