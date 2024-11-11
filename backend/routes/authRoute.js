import express from 'express';
import jwt from 'jsonwebtoken';

const authRoute = express.Router();

authRoute.get("/user-status", (req, res) => {
    try {
        const token = req.cookies.authToken;
        console.log(req.cookies);
        
        if (!token) {
            return res.json({ isLoggedIn: false, isAdmin: false });
        }

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decoded) => {
            if (err) {
                // If token verification fails, user is not logged in
                return res.json({ isLoggedIn: false, isAdmin: false });
            }

            // Check if token has `isAdmin` property
            const isAdmin = decoded.isAdmin || false;
            res.json({ isLoggedIn: true, isAdmin });
        });
    } catch (error) {
        res.status(500).json({ message: "Error checking user status", error: error.message });
    }
});

export default authRoute;
