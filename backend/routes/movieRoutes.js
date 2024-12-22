import express from 'express';
import authenticateAdmin from '../middlewares/adminMiddleware.js';
import { adminModel, movieModel, userModel } from '../models/User.js';

const router = express.Router();

// Public Routes
router.get("/all-movies", async (req, res) => {
    try {
        const movies = await movieModel.find({});
        res.json({ message: "Retrieved all movies", movies });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movies", error: error.message });
    }
});

router.get("/specific-movie/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const specific = await movieModel.findById(id).populate({
            path: 'reviews.userId',
            select: 'username', 
        });
                
    //    console.log(specific.reviews) ;

        if (!specific) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(specific);
    } catch (error) {
        console.error("Error retrieving movie:", error);
        res.status(500).json({ message: "Error retrieving movie", error: error.message });
    }
});


router.post("/add-review/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const { comment, userId } = req.body;

        if (!userId || !comment.trim()) {
            return res.status(400).json({ message: "User ID and comment are required" });
        }

        let user;
        let username;

        // Check if userId exists in adminModel
        user = await adminModel.findById(userId);
        if (user) {
            username = user.username;
        } else {
            // If not found in adminModel, search in userModel
            user = await userModel.findById(userId);
            if (user) {
                username = user.username;
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        }

        const movie = await movieModel.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const review = {
            userId,
            comment,
            username, // Add username to the review
            createdAt: new Date(),
        };

        movie.reviews.push(review);
        await movie.save();

        res.status(201).json({ message: "Review added successfully", reviews: movie.reviews });
    } catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
});


// Admin Routes
router.post("/create-movie", authenticateAdmin, async (req, res) => {
    try {
        console.log(req.body)
        const { title, description, year, imageUrl } = req.body;

        if (!title || !description || !year || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const movie = await movieModel.create({ title, description, year, imageUrl });

        res.json({ message: "Movie created successfully", movie });
    } catch (error) {
        res.status(500).json({ message: "Error creating movie", error: error.message });
    }
});

router.put("/update-movie/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedMovie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
        res.status(500).json({ message: "Error updating movie", error: error.message });
    }
});

router.delete("/delete-movie/:id", authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovie = await movieModel.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting movie", error: error.message });
    }
});


router.get("/search-movies", async (req, res) => {
    try {
        const { query } = req.query;
        const movies = await movieModel.find({
            title: { $regex: query, $options: "i" }, 
        });
        res.json({ movies });
    } catch (error) {
        res.status(500).json({ message: "Error searching movies", error: error.message });
    }
});


export default router;
