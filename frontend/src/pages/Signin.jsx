import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Signin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  

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

        try {
            const response = await fetch(`http://localhost:3000/api/v1/users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            if (response.ok) {
                alert("Signed in successfully!");
                setFormData({ email: '', password: '' }); 
                navigate("/");  
            } else if (response.status === 400) {
                setErrorMessage("Invalid email or password format.");
            } else if (response.status === 401) {
                setErrorMessage("Incorrect email or password. Please try again.");
            } else {
                const errorData = await response.json();
                setErrorMessage(`An error occurred: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error during signin:", error);
            setErrorMessage("A network error occurred. Please check your connection and try again.");
        }
    };

    return (
        <div className="bg-black h-fit min-h-screen flex items-center justify-center">
            <div className="lg:h-[60%] lg:w-[35%] sm:h-[80%] sm:w-[60%] h-[80%] w-[80%]">
                <h2 className="text-white text-3xl font-bold">Sign In</h2>
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
                            Sign In
                        </button>
                    </div>

                    <div className="text-center text-gray-600 text-sm mt-4">
    <h1>
        New User?{" "}
        <span onClick={() => navigate("/signup")} className="text-teal-500 cursor-pointer">
            Sign up
        </span>
    </h1>
    <h1 className="mt-2">
        <span onClick={() => navigate("/admin-signin")} className="text-teal-500 cursor-pointer">
            Sign in as Admin
        </span>
    </h1>
</div>

                </form>
            </div>
        </div>
    );
};

export default Signin;
