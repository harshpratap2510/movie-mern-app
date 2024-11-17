import React from 'react';
import { useNavigate } from 'react-router';

const MovieCard = ({ movies }) => {
    const navigate = useNavigate();

    // Function to truncate text with ellipsis if too long
    const truncateText = (text, maxLength) => {
        if (!text) return ''; // If text is undefined or null, return an empty string
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <div className="p-8 bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-white">All Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            onClick={() => navigate(`/movie-detail/${movie._id}`)}
                            key={movie._id}
                            className="bg-gray-800 cursor-pointer p-4 rounded-lg shadow-md"
                        >
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="w-full h-40 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="font-semibold text-lg text-white">{movie.title}</h3>
                            <p className="text-gray-400">{truncateText(movie.description, 60)}</p>
                            <p className="text-gray-500 mt-2">Year: {movie.year}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No movies found.</p>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
