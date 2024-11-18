import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Review Schema
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    username: { type: String, required: true }, // Add username here
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
 

 
// Movie Schema
const movieSchema = new Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true }, // Added description
        year: { type: Number, required: true, min: 1800 },  
        imageUrl: { type: String, required: true }, // Add a validation regex for valid URLs if needed
        reviews: [reviewSchema], 
    },
    {
        timestamps: true,  
    }
);


// User Schema
const userSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, minlength: 3 },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
    },
    {
        timestamps: true,
    }
);

// Admin Schema
const adminSchema = new Schema(
    {
        username: { type: String, required: true, trim: true, minlength: 3 },
        email: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true, minlength: 6 },
    },
    {
        timestamps: true,
    }
);

// Models
const userModel = model("user", userSchema);
const adminModel = model("admin", adminSchema);
const movieModel = model("movie", movieSchema);
const reviewModel = model("review", reviewSchema);

export { userModel, adminModel, movieModel,reviewModel };
