import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(""); // To store detailed error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); 

        try {
            const response = await fetch("http://localhost:3000/api/v1/admin/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert("Signed up successfully!");
                setFormData({ email: '', username: '', password: '' });
                navigate("/signin"); // Redirect to the sign-in page
            } else {
                // If the response status is not OK, extract the error message
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setErrorMessage("An error occurred");
        }
    };

    return (
        <div className="bg-black h-fit min-h-screen flex items-center justify-center">
            <div className="lg:h-[60%] lg:w-[35%] sm:h-[80%] sm:w-[60%] h-[80%] w-[80%]">
                <h2 className="text-white text-3xl font-bold">Sign Up</h2>

                <form onSubmit={handleSubmit} className="text-black flex text-xl flex-col gap-8 p-8">
                    <div className="flex flex-col font-semibold">
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="flex flex-col font-semibold">
                        <label>
                            Username
                            <input
                                type="text"
                                name="username"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </label> 
                    </div>

                    <div className="flex flex-col font-semibold">
                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter Password"
                                value={formData.password}
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
                            Sign Up
                        </button>
                    </div>

                    <div className='text-center text-gray-600 text-sm'>
                        <h1>Already registered as Administrator? <span onClick={() => navigate("/admin-signin")} className='text-teal-500 cursor-pointer'>Sign in</span></h1>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSignup;
