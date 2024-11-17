import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // For hamburger menu visibility

    // Fetch user status (whether logged in and if admin)
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
        fetchStatus();
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            let logoutUrl = "";
    
            // Choose logout URL based on user type
            if (isAdmin) {
                logoutUrl = "http://localhost:3000/api/v1/admin/logout"; // Admin logout route
            } else if (isLoggedIn) {
                logoutUrl = "http://localhost:3000/api/v1/users/logout"; // User logout route
            }
    
            // If a logout URL is set, proceed to logout
            if (logoutUrl) {
                const response = await fetch(logoutUrl, {
                    method: "POST",
                    credentials: "include",
                });
    
                if (response.ok) {
                    setIsLoggedIn(false);
                    setIsAdmin(false);
                    navigate("/"); // Navigate to home after logout
                } else {
                    console.error("Error logging out");
                }
            } else {
                console.error("No valid logout route found");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    

    const handleProfileClick = () => {
        if (isAdmin) {
            navigate("/admin-profile");
        } else {
            navigate("/user-profile");
        }
    };

    return (
        <div>
            <nav className="fixed top-0 w-full flex items-center justify-between px-8 py-4 bg-black bg-opacity-80 shadow-lg z-10">
                <h1 className="text-2xl font-bold cursor-pointer text-white hover:text-gray-300" onClick={() => navigate("/")}>
                    MovieApp
                </h1>

                {/* Hamburger Icon for Mobile Screens */}
                <div className="lg:hidden flex  space-y-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={`w-6 h-1 bg-white transition-all duration-300 ${isMenuOpen && "rotate-45 translate-y-2"}`}></div>
                    <div className={`w-6 h-1 bg-white transition-all duration-300 ${isMenuOpen && "opacity-0"}`}></div>
                    <div className={`w-6 h-1 bg-white transition-all duration-300 ${isMenuOpen && "-rotate-45 -translate-y-2"}`}></div>
                </div>

                {/* Navbar Links */}
                <ul 
    className={`lg:flex gap-10 text-lg items-center transition-all duration-300 ${isMenuOpen ? 'flex-col absolute top-full left-0 bg-black w-full p-4 space-y-6 opacity-100' : 'hidden lg:flex opacity-0 lg:opacity-100'}`}
>
    <li 
        className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
        onClick={() => navigate("/")}
    >
        Home
    </li>
    {isLoggedIn ? (
        <>
            <li 
                className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
                onClick={handleProfileClick}
            >
                Profile
            </li>
            <li 
                className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
                onClick={handleLogout}
            >
                Logout
            </li>
        </>
    ) : (
        <li 
            className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
            onClick={() => navigate("/signup")}
        >
            Signup
        </li>
    )}
    <li 
        className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
        onClick={() => navigate("/about")}
    >
        About
    </li>
    {isAdmin && (
        <li 
            className="cursor-pointer transition-all duration-200 hover:bg-gray-700 p-2 rounded-lg"
            onClick={() => navigate("/dashboard")}
        >
            Dashboard
        </li>
    )}
</ul>

            </nav>
        </div>
    );
};

export default Navbar;
