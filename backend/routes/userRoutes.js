import express from 'express';
import { userModel } from '../models/User.js';
import authorize from '../middlewares/authMiddleware.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;

    try { 
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email,
            username,
            password: hashedPassword,
        });

        res.json({ message: "Signed up successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
});

// Signin route
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, isLoggedIn, isAdmin }, process.env.JWT_SECRET);

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000, // 1 hour
            sameSite: "Lax",
            path: "/",
        });

        res.json({
            message: "Signed in successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error: error.message });
    }
});


// Logout route
router.post("/logout", (req, res) => {
    res.clearCookie("authToken"); 
    res.json({ message: "Signed out successfully" });
});

// Protected Profile route
router.route("/profile")
    .get(authorize, async (req, res) => {
        try {
            const user = await userModel.findById(req.user.id).select('-password');
            res.json({ message: "User profile fetched successfully", user });
        } catch (error) {
            res.status(500).json({ message: "Error fetching profile", error: error.message });
        }
    })
    .put(authorize, async (req, res) => {
        try {
            const updatedData = req.body;
            if (updatedData.password) {
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }

            const updatedUser = await userModel.findByIdAndUpdate(req.user.id, updatedData, { new: true });
            res.json({ message: "Profile updated successfully", user: updatedUser });
        } catch (error) {
            res.status(500).json({ message: "Error updating profile", error: error.message });
        }
    });

export default router;

