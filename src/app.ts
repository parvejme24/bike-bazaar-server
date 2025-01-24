import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db";

dotenv.config();

// Initialize Express app
const app: Application = express();

// Middleware

// Body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie parser middleware to parse cookies
app.use(cookieParser());

// Use helmet to secure HTTP headers
app.use(helmet());

// Use morgan for logging HTTP requests
app.use(morgan("dev"));

// Use CORS to allow cross-origin requests
app.use(cors());

// Rate limiting to prevent too many requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});
app.use(limiter);

// Connect to Database
connectDB();

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Bike Bazaar API",
  });
});

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
  });
});

export default app;
