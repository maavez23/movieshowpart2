const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 3,                 // IMPORTANT for free tier
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on("connect", () => {
  console.log("✅ Connected to Supabase PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Supabase DB error", err);
});

module.exports = pool;
