import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "../routes/auth.route.js";
import userRoutes from "../routes/user.route.js";
import postRoutes from "../routes/post.route.js";
import notificationRoutes from "../routes/notification.route.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === "production" 
        ? [process.env.FRONTEND_URL] 
        : "http://localhost:3000",
    credentials: true
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

// Vercel serverless function handler
export default app; 