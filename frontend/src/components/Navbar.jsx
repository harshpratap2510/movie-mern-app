import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/auth/user-status", {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    const { isLoggedIn, isAdmin } = data;
                    setIsLoggedIn(isLoggedIn);
                    setIsAdmin(isAdmin);
                } else {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Error fetching user status", error);
                setIsLoggedIn(false);
                setIsAdmin(false);
            }
        };
        console.log(isAdmin,isLoggedIn);
        fetchStatus();
        console.log(isAdmin,isLoggedIn);
    }, []);

    const handleProfileClick = () => {
        if (isAdmin) {
            navigate("/admin-profile");
        } else {
            navigate("/user-profile");
        }
    };

    return (
        <div>
            <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 bg-black bg-opacity-80 shadow-lg">
                <h1 className="text-2xl font-bold" onClick={() => navigate("/")}>MovieApp</h1>
                <ul className="flex gap-10 text-lg">
                    <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/")}>Home</li>
                    {isLoggedIn ? (
                        <li className="cursor-pointer hover:text-gray-300" onClick={handleProfileClick}>
                            Profile
                        </li>
                    ) : (
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/signup")}>
                            Signup
                        </li>
                    )}
                    <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/about")}>About</li>
                    {isAdmin && (
                        <li className="cursor-pointer hover:text-gray-300" onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </li>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
