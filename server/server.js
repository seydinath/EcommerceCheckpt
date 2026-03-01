require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const requestRoutes = require("./routes/requests");
const meRoutes = require("./routes/me");
const categoriesRoutes = require("./routes/categories");
const usersRoutes = require("./routes/users");

const app = express();
app.disable("x-powered-by");

// Basic security/CORS
const rawOrigins = (process.env.CORS_ORIGIN || "http://localhost:8080,http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // non-browser or same-origin
    if (rawOrigins.includes("*") || rawOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
// Handle preflight for all routes on Express v5 (no "*" path support)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json({ limit: "10mb" }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true, timestamp: new Date() }));

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to AgroMarket API",
    status: "running",
    version: "1.0.0",
    documentation: "See README.md for API documentation",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      products: "/api/products",
      requests: "/api/requests",
      categories: "/api/categories",
      users: "/api/users",
      me: "/api/me"
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/me", meRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoutes);

// Not found fallback
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
    path: req.originalUrl
  });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Server error:", err.message);
  res
    .status(err.status || 500)
    .json({ 
      error: err.message || "Internal Server Error",
      status: err.status || 500
    });
});

// MongoDB connection and server start
const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI;

async function start() {
  if (!MONGODB_URI) {
    console.error("❌ Missing MONGODB_URI in .env");
    console.error("💡 Check .env.example for configuration guide");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 AgroMarket API listening on http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}`);
      console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      console.log("\n⏹️  Shutting down gracefully...");
      server.close(async () => {
        console.log("✅ HTTP server closed");
        try {
          await mongoose.connection.close();
          console.log("✅ MongoDB connection closed");
        } catch (err) {
          console.error("❌ Error closing MongoDB:", err.message);
        }
        process.exit(0);
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error("⚠️  Forcing shutdown...");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (e) {
    console.error("❌ Failed to start server:", e.message);
    if (e.message.includes("ECONNREFUSED")) {
      console.error("💡 Is MongoDB running? Start with: mongod");
    } else if (e.message.includes("authentication failed")) {
      console.error("💡 Check your MongoDB credentials in .env");
    }
    process.exit(1);
  }
}

start();
