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
const allowedOrigins = [
  'http://localhost:3000',
];

// Middlewares
app.use(express.json());
// app.use(cors({
//   origin: function (origin, callback) {
//     // allow requests with no origin (like mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     } else {
//       return callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.use(cors())

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.static("public")); // serve uploaded files

// routes
routeStartup(app);

// Error Handler
app.use(errorHandler);

export default app;
