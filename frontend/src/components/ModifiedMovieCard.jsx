import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModMovieCard = ({ movies, setMovies }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const navigate = useNavigate();

    const truncateText = (text, maxLength) => {
        if (!text) return ''; // If text is undefined or null, return an empty string
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };
    const openDeleteModal = (movieId) => {
        setSelectedMovieId(movieId);
        setShowModal(true);
    };

    const closeDeleteModal = () => {
        setShowModal(false);
        setSelectedMovieId(null);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/movies/delete-movie/${selectedMovieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                // Filter out the deleted movie from the movies list
                setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== selectedMovieId));
                alert("Movie deleted successfully");
                closeDeleteModal();
            } else {
                const data = await response.json();
                console.error("Error deleting movie:", data.message);
            }
        } catch (error) {
            console.error("Error deleting movie:", error);
        }
    };

    const handleUpdate = (movieId) => {
        navigate(`/update-movie/${movieId}`);
    };

    return (
        <div className="p-8 bg-gray-900">
            <h2 className="text-2xl font-bold mb-4 text-white">All Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div key={movie._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <img src={movie.imageUrl} alt={movie.title} className="w-full h-40 object-cover mb-4 rounded-lg" />
                        <h3 className="font-semibold text-lg text-white">{movie.title}</h3>
                        <p className="text-gray-400">{truncateText(movie.description, 35)}</p>
                        <p className="text-gray-500 mt-2">Year: {movie.year}</p>
                        <div className="flex gap-4 mt-4 justify-around">
                            <button
                                onClick={() => openDeleteModal(movie._id)}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleUpdate(movie._id)}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for delete confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure you want to delete?</h3>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeDeleteModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModMovieCard;
