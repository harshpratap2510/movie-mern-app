import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import path from "path";

import connectDb from "./config/db.js"

import userRoutes from "./routes/userRoutes.js "
import adminRoutes from "./routes/adminRoutes.js " 
import movieRoutes from "./routes/movieRoutes.js"
import cors from 'cors'
import authRoute from "./routes/authRoute.js";

const app = express();


dotenv.config();
connectDb();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173 ', // Frontend URL
    credentials: true // Allows cookies to be sent across origins
}));

const PORT = process.env.PORT || 3000 ;

//Routes
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/admin",adminRoutes);
app.use("/api/v1/movies",movieRoutes);
app.use("/api/v1/auth",authRoute);
// app.use("/api/v1/genre", genreRoutes);

app.listen(PORT,()=> console.log(`Running on port ${PORT}`)); 