const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================== REGISTER ==================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hash]
    );

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    // duplicate email error
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "SECRET",
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
