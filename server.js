process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

const app = express();

connectDB();

const normalizeOrigin = (origin = "") => {
  const trimmed = String(origin).trim();
  if (!trimmed) return "";

  if (trimmed === "*") return "*";

  try {
    return new URL(trimmed).origin.toLowerCase();
  } catch (_err) {
    return trimmed.replace(/\/+$/, "").toLowerCase();
  }
};

const normalizePattern = (pattern = "") => String(pattern).trim().replace(/\/+$/, "").toLowerCase();

const parseAllowedOrigins = () => {
  const origins = (process.env.CORS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

  return origins.length > 0 ? origins : ["*"];
};

const parseAllowedOriginPatterns = () =>
  (process.env.CORS_ALLOWED_ORIGIN_PATTERNS || "")
    .split(",")
    .map((pattern) => normalizePattern(pattern))
    .filter(Boolean);

const wildcardToRegExp = (pattern = "") =>
  new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`, "i");

const allowedOrigins = parseAllowedOrigins();
const allowAllOrigins = allowedOrigins.includes("*");
const allowedOriginPatterns = parseAllowedOriginPatterns();
const allowedOriginPatternRegexes = allowedOriginPatterns.map((pattern) => wildcardToRegExp(pattern));
const defaultAllowedHeaders = ["Content-Type", "Authorization"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (e.g., mobile apps, Postman, curl).
      if (!origin) {
        return callback(null, true);
      }

      const requestOrigin = normalizeOrigin(origin);

      const matchesPattern = allowedOriginPatternRegexes.some((regex) => regex.test(requestOrigin));

      if (allowAllOrigins || allowedOrigins.includes(requestOrigin) || matchesPattern) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: (req, callback) => {
      const requestedHeaders = req.header("access-control-request-headers");
      if (requestedHeaders) {
        return callback(null, requestedHeaders);
      }
      return callback(null, defaultAllowedHeaders);
    },
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/portfolio", portfolioRoutes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
  const patternLog = allowedOriginPatterns.length
    ? ` | patterns: ${allowedOriginPatterns.join(", ")}`
    : "";
  console.log(
    `CORS mode: ${allowAllOrigins ? "allow all" : allowedOrigins.join(", ")}${patternLog}`
  );
});
