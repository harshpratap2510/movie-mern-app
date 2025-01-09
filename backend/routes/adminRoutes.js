import express from 'express';
import { adminModel, userModel } from '../models/User.js';  // Ensure you have correct models
import authorize from '../middlewares/authMiddleware.js';
import authenticateAdmin from '../middlewares/adminMiddleware.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const adminRouter = express.Router();

// Admin signup route
adminRouter.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await adminModel.create({
            email,
            username,
            password: hashedPassword,
        });
        res.json({ message: "Signed up successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
});

// Admin signin route
adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await adminModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        // Generate token and add `isAdmin` and `isLoggedIn` to the response
        const token = jwt.sign({ id: user._id, isAdmin: true }, process.env.JWT_SECRET_ADMIN);

        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 30 * 24 * 60 * 60 * 1000 , // 30 days
            sameSite: 'None',
            path: "/",
        });

        res.json({
            message: "Signed in successfully",
            token,
            isAdmin: true,  // Added isAdmin flag
            isLoggedIn: true // Added isLoggedIn flag
        });
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error: error.message });
    }
}); 

// Admin profile routes (GET and PUT)
adminRouter.route("/profile")
    .get(authenticateAdmin, async (req, res) => {
        try {
            // Get the authenticated admin's profile
            const admin = await adminModel.findById(req.user.id).select('-password'); // Exclude password from the response
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }
            res.json({ message: "Admin profile fetched successfully", admin });
        } catch (error) {
            res.status(500).json({ message: "Error fetching admin profile", error: error.message });
        }
    })
    .put(authenticateAdmin, async (req, res) => {
        try {
            const updatedData = req.body;

            // If a password is provided, hash it before updating
            if (updatedData.password) {
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }

            // Update the admin profile
            const updatedAdmin = await adminModel.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
            if (!updatedAdmin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            res.json({ message: "Admin profile updated successfully", admin: updatedAdmin });
        } catch (error) {
            res.status(500).json({ message: "Error updating admin profile", error: error.message });
        }
    });

// Admin protected route to get all user profiles
adminRouter.get("/all-profiles", authenticateAdmin, async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profiles", error: error.message });
    }
});

adminRouter.post("/logout", (req, res) => {
    res.clearCookie("authToken"); 
    res.json({ message: "Signed out successfully" });
});

export default adminRouter;
