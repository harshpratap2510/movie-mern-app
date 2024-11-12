import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        imageUrl: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { movieId } = useParams(); // Get movieId from route parameters

    useEffect(() => {
        // Fetch the existing movie data by ID when the component mounts
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/movies/specific-movie/${movieId}`);
                const data = await response.json();

                // console.log(data.title);
                // console.log(data.description);

                if (response.ok) {
                    setFormData({
                        title: data.title,
                        description: data.description,
                        year: data.year,
                        imageUrl: data.imageUrl,
                    });
                } else {
                    setErrorMessage("Failed to load movie data.");
                }
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setErrorMessage("A network error occurred. Please try again.");
            }
        };

        fetchMovieData();
    }, [movieId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch(`http://localhost:3000/api/v1/movies/update-movie/${movieId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            if (response.ok) {
                alert('Movie updated successfully!');
                navigate('/'); // Redirect to the homepage or movies list
            } else {
                const errorData = await response.json();
                setErrorMessage(`An error occurred: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            setErrorMessage("A network error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-black h-fit min-h-screen flex items-center justify-center">
            <div className="lg:h-[60%] lg:w-[35%] sm:h-[80%] sm:w-[60%] h-[80%] w-[80%]">
                <h2 className="text-white text-3xl font-bold">Update Movie Data</h2>
                <form onSubmit={handleSubmit} className="text-black flex text-xl flex-col gap-8 p-6 pb-0">
                    <div className="flex flex-col font-semibold">
                        <label>
                            Title
                            <input
                                type="text"
                                name="title"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <label>
                            Description
                            <input
                                type="text"
                                name="description"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col font-semibold">
                        <label>
                            Year
                            <input
                                type="number"
                                name="year"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter year"
                                value={formData.year}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="flex flex-col font-semibold">
                        <label>
                            Image URL
                            <input
                                type="text"
                                name="imageUrl"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter image URL"
                                value={formData.imageUrl}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    {errorMessage && (
                        <div className="text-red-500 text-center mt-4">
                            {errorMessage}
                        </div>
                    )}

                    <div className="w-full flex justify-center">
                        <button type="submit" className="w-fit p-2 px-4 rounded-xl bg-teal-500 text-white font-semibold">
                            Update Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateMovie ;
