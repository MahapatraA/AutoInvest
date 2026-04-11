process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

// ✅ Connect to MongoDB safely
connectDB()
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Failed:", err));

// ✅ Simple CORS (allow all for now)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Root route (Railway needs this)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    message: "Server is healthy ✅",
  });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/portfolio", portfolioRoutes);

// ✅ Use Railway port
const PORT = process.env.PORT || 3000;

// ❗ IMPORTANT: Do NOT use HOST or shutdown logic
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
