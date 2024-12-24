import React, { useState } from 'react';
const BASE_URL=import.meta.env.VITE_BASE_URL

const CreateMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        imageUrl: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "imageUrl" && files?.length > 0) {
            const file = files[0];
            const reader = new FileReader();

            if (file.type === "image/jpeg" || file.type === "image/png") {
                reader.onload = () => {
                    setFormData((prevData) => ({
                        ...prevData,
                        imageUrl: reader.result, // Base64 string
                    }));
                };
                reader.readAsDataURL(file);
            } else {
                setErrorMessage("Only JPEG or PNG images are allowed.");
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.description || !formData.title || !formData.year || !formData.imageUrl) {
            setErrorMessage("All fields are required.");
            return;
        }
        if (formData.description.length < 10) {
            setErrorMessage("Description must be at least 10 characters long.");
            return;
        }

        try {
            console.log(formData)
            const response = await fetch(`${BASE_URL}/api/v1/movies/create-movie`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert("Movie created successfully!");
                setFormData({ title: '', description: '', year: '', imageUrl: '' });
            } else {
                const errorData = await response.json();
                console.error("Backend error:", errorData);
                setErrorMessage(`An error occurred: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Network error:", error);
            setErrorMessage("A network error occurred. Please check your connection.");
        }
    };

    return (
        <div className="bg-black h-fit min-h-screen flex items-center justify-center">
            <div className="lg:h-[60%] lg:w-[35%] sm:h-[80%] sm:w-[60%] h-[80%] w-[80%]">
                <h2 className="text-white text-3xl font-bold">Add New Movie</h2>
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
                            Image
                            <input
                                type="file"
                                accept=".jpeg,.jpg,.png"
                                name="imageUrl"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
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
                            Create Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateMovie;
