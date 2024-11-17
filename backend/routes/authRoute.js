import express from 'express';
import jwt from 'jsonwebtoken';

const authRoute = express.Router();

authRoute.get("/user-status", (req, res) => {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            return res.json({ isLoggedIn: false, isAdmin: false });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);
            req.user = decoded;
            // console.log(req.user);
            return res.json({ isLoggedIn: true, isAdmin: true, userId: decoded.id });
        } catch {
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                return res.json({ isLoggedIn: true, isAdmin: false, userId: decoded.id });
            } catch {
                return res.json({ isLoggedIn: false, isAdmin: false });
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Error checking user status", error: error.message });
    }
});

export default authRoute;
