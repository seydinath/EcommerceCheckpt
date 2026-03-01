const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  console.error(
    "FATAL ERROR: JWT_SECRET is not defined in environment variables."
  );
}

function sign(user) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is missing");
  return jwt.sign({ role: user.role, id: user.id }, JWT_SECRET, {
    subject: user.id,
    expiresIn: JWT_EXPIRES_IN,
  });
}

router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName, role, businessName, location } =
      req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });
    if (!fullName)
      return res.status(400).json({ error: "Full name is required" });
    if (!role || !["buyer", "seller", "farmer"].includes(role)) {
      return res.status(400).json({
        error: "Role must be 'buyer', 'seller', or 'farmer'",
      });
    }

    // Sellers and farmers must provide business name
    if (["seller", "farmer"].includes(role) && !businessName) {
      return res.status(400).json({
        error: "Business name is required for sellers and farmers",
      });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ error: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      passwordHash,
      fullName: fullName.trim(),
      role,
      businessName: businessName ? businessName.trim() : "",
      location: location ? location.trim() : "",
    });

    const token = sign(user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        businessName: user.businessName,
      },
    });
  } catch (e) {
    console.error("Register error:", e);
    return res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = sign(user);
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        businessName: user.businessName,
        location: user.location,
      },
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Login failed", details: e.message });
  }
});

module.exports = router;
