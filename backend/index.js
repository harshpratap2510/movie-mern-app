import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import connectDb from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import cors from 'cors';
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();
connectDb();

// middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'], 
    credentials: true
}));

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/auth", authRoute);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
