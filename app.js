const express = require("express");
const app = express();
const router = require("./src/apis");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

// Security middleware imports
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

// Configure rate limiting
const limiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 1000 });

// CORS options
const corsOptions = {
  origin: [
    "*",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://sensational-valkyrie-0f292b.netlify.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

// Use security middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(limiter);

// Use non-security middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API routes
app.use("/api/v1", router);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Munshi-Wholesale Server" });
});

// Invalid URL handler
app.get("*", (req, res) => {
  res.status(404).json({ message: "Invalid URL" });
});

// Client-side error handler
app.use((req, res, next) => {
  next(createError(404, { message: "Route not found" }));
});

// Server error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
