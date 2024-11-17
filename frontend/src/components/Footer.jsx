import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Import specific icons

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
                {/* Left Section */}
                <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold">Harsh.co</h1>
                    <p className="text-gray-400 mt-2">Crafting technology with passion and precision.</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/your-github-username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/your-linkedin-username/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-200 transition"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a
                        href="mailto:your-email@gmail.com"
                        className="text-gray-400 hover:text-gray-200 transition"
                    >
                        <FaEnvelope size={24} />
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center md:text-right text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Harsh.co. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
