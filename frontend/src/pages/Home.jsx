import React, { useState } from 'react';
import banner from "../assets/banner1.jpg"
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';

const Home = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="h-screen bg-black text-white">
            {/* Navbar */}
            <Navbar/>

            {/* Background with search bar */}
            <div
                className="h-[80%] flex items-end justify-center "
                style={{
                    backgroundImage: `url(${banner})` ,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded-xl w-[50%]">
                    <input
                        type="text"
                        placeholder="Search Movies"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-3 w-full rounded-md text-black text-lg"
                    />
                </div>
            </div>

            {/* Movie Cards Section */}
           <MovieCard/>
        </div>
    );
};

export default Home;
