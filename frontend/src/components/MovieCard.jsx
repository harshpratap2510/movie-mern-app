import React, { useEffect, useState } from 'react';

const MovieCard = () => {
    const [movies, setMovies] = useState([]); // State to hold movies

    useEffect(() => {
        // Fetch movies from the backend
        const fetchMovies = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/movies/all-movies"); // Adjust the URL as needed
                const data = await response.json();
                
                if (response.ok) {
                    setMovies(data.movies); // Set movies data
                } else {
                    console.error("Error retrieving movies:", data.message);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="p-8 bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-white">All Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div key={movie._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <img src={movie.imageUrl} alt={movie.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                        <h3 className="font-semibold text-lg text-white">{movie.title}</h3>
                        <p className="text-gray-400">{movie.description}</p>
                        <p className="text-gray-500 mt-2">Year: {movie.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieCard;
