const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================== REGISTER ==================
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hash]
    );

    res.json({ message: "User Registered Successfully" });

  } catch (err) {
    console.error("REGISTER ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 👈 IMPORTANT
    res.status(500).json({ message: "Login failed" });
  }
};

