import express, { response } from 'express'
import authenticateAdmin from '../middlewares/adminMiddleware.js';
import { movieModel } from '../models/User.js';

const router = express.Router();

//public routes
router.get("/all-movies",async (req, res) => {
    try {
        const movies = await movieModel.find({});
        res.json({ message: "Retrieved all movies",movies });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving movies", error: error.message });
    }
}) ;


router.get("/specific-movie/:id", async (req, res) => {
    try {
        const { id } = req.params;
 
        const specific = await movieModel.findById(id); 
        if (!specific) {
            return res.status(404).json({ message: "Movie not found" });
        }
 
        res.status(200).json(specific);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving movie", error: error.message });
    }
});

 


//Admin
router.post("/create-movie",authenticateAdmin,async (req, res) => {
    try {
        const movieData = req.body;
        const {title , description ,year,imageUrl } = req.body ;

        const movie = await movieModel.create({
            title ,
            description,
            year,
            imageUrl,
            // creatorId : req.user.id,
            
        });
        // console.log(movie._id)

    res.json({ message: "Movie created successfully", movie: movieData , movieId : movie._id});
    } catch (error) {
        res.status(500).json({ message: "Error creating movie", error: error.message });
    }});

    router.put("/update-movie/:id", authenticateAdmin, async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
    
            const updatedMovie = await movieModel.findByIdAndUpdate(id, updatedData, { new: true });
            if (!updatedMovie) {
                return res.status(404).json({ message: "Movie not found" });
            }
    
            res.json({ message: `Movie with ID: ${id} updated successfully`, movie: updatedMovie });
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
    
            res.json({ message: `Movie with ID: ${id} deleted successfully` });
        } catch (error) {
            res.status(500).json({ message: "Error deleting movie", error: error.message });
        }
    });
    

export default router;

