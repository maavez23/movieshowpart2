function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.style.color = "red";
    msg.innerText = "Please fill all fields";
    return;
  }

if (email === "admin" && password === "admin") {
  msg.style.color = "#2ecc71";
  msg.innerText = "Admin login successful";

  // ✅ FAKE TOKEN FOR ADMIN
  localStorage.setItem("token", "ADMIN_DEMO_TOKEN");
  localStorage.setItem("role", "ADMIN");

  setTimeout(() => {
    window.location.href = "admin.html";
  }, 800);

  return;
}


  // 👤 USER LOGIN (API)
  fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (!data.token) throw data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", "USER");

      msg.style.color = "#2ecc71";
      msg.innerText = "Login successful";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 800);
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText = err.message || "Invalid email or password";
    });
}
