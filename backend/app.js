import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.js";
import routeStartup from "./routes/routeStartup.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";


connectDB()

const app = express();
// Middlewares
app.use(express.json());


const allowedOrigins = [
  "http://localhost:3000",
  "https://gym-membership-platform.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("public")); // serve uploaded files

// routes
routeStartup(app);

// Error Handler
app.use(errorHandler);

export default app;
