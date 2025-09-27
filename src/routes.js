const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Health check (always public)
router.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// Fake login - returns JWT
router.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ user: "admin", role: "ADMIN" }, "secret", { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Protected route
router.get("/api/data", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secret");
    res.json({ message: `Hello ${decoded.user}, you have access!` });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
