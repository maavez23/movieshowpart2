// config.js — API base for local + production

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://movieshowpart2.onrender.com";
