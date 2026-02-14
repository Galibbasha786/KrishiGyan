// index.js - UPDATED FOR LOCAL MONGODB
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";


import expenseRoutes from "./routes/expenseRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import passwordResetRoutes from "./routes/passwordResetRoutes.js"
dotenv.config();

const app = express();

// Basic security headers
app.use(helmet());

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // limit each IP to 120 requests per windowMs
});
app.use(limiter);

// Configure CORS to allow only configured origins
const FRONTEND_URL = process.env.FRONTEND_URL;
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS; // comma-separated
let corsOptions = {};
if (FRONTEND_URL || ALLOWED_ORIGINS) {
  const origins = ALLOWED_ORIGINS
    ? ALLOWED_ORIGINS.split(",").map((o) => o.trim())
    : [FRONTEND_URL];
  corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl)
      if (!origin) return callback(null, true);
      if (origins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
} else {
  // default to permissive for local development
  corsOptions = { origin: true, credentials: true };
}

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/contact", contactRoutes);


app.use("/api/expenses", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/password-reset", passwordResetRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("🌾 AI Kerala Farmers Backend Running ✅");
});

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running smoothly",
    database: "Local MongoDB",
    timestamp: new Date().toISOString(),
    features: [
      "Authentication",
      "Farm Management",
      "Weather Data",
      "Crop Recommendations",
      "Pest & Disease Database",
      "Market Prices",
      "Government Schemes",
    ],
  });
});

// 🔥 Connect to MongoDB (env or local fallback)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/krishigyan";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log(`✅ Connected to MongoDB`))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err));

// Start Server
const PORT = process.env.PORT || 8080;
app.set('trust proxy', 1); // if behind a proxy (Render, Vercel)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});