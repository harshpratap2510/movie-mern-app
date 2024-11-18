import React, { useState } from 'react'; 

const CreateMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        year: '',
        imageUrl: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
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
            const response = await fetch(`http://localhost:3000/api/v1/movies/create-movie`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });
    
            if (response.ok) {
                alert("Movie created successfully!");
                setFormData({ title: '', description: '', year: '', imageUrl: '' });
                // navigate("/");  
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
                            Image URL
                            <input
                                type="text"
                                name="imageUrl"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter imageUrl"
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
                            Create Movie
                        </button>
                    </div>

                    <div className="text-center text-gray-600 text-sm mt-4">

                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateMovie;
