import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL=import.meta.env.VITE_BASE_URL

const AdminProfile = () => {
    const [formData, setFormData] = useState({
       username: '',
       email: '',
       password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the existing admin profile data
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/admin/profile`, {
                    credentials: 'include', // Ensure cookies are included
                });
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        username: data.admin.username,
                        email: data.admin.email,
                        password: '', // Avoid populating password from the server
                    });
                } else {
                    setErrorMessage("Failed to load profile data.");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setErrorMessage("A network error occurred. Please try again.");
            }
        };

        fetchProfileData();
    }, []);

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

        // Only send the password if it's not empty
        const dataToSend = { ...formData };
        if (dataToSend.password === '') {
            delete dataToSend.password; // Don't send the password if it's empty
        }

        try {
            const response = await fetch(`${BASE_URL}/api/v1/admin/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
                credentials: 'include',
            });

            if (response.ok) {
                alert('Profile updated successfully!');
                navigate('/'); // Redirect to the homepage or movies list
            } else {
                const errorData = await response.json();
                setErrorMessage(`An error occurred: ${errorData.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setErrorMessage("A network error occurred. Please try again.");
        }
    };

    return (
        <div className="bg-black min-h-screen h-fit flex items-center justify-center">
            <div className="lg:h-[70%] lg:w-[45%] sm:h-[80%] sm:w-[60%] h-[80%] w-[80%]">
                <h2 className="text-white text-3xl font-bold">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="text-black flex text-xl flex-col gap-8 p-8">
                    <div className="flex flex-col font-semibold">
                        <label >
                        <p className='text-white'> Email Address</p>
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
                        <label >
                            <p className='text-white'> Username</p>
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
                        <p className='text-white'> Password</p>
                            <input
                                type="password"
                                name="password"
                                className="m-1 bg-white rounded-lg p-2 w-full text-lg font-normal"
                                placeholder="Enter New Password"
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
                            Submit
                        </button>
                    </div> 
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;
