import React, { useState, useEffect } from 'react';
import banner from '../assets/banner1.jpg';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';

const Home = () => {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState([]); // State to hold the movies list

    // Fetch movies based on the search term
    const fetchMovies = async (query = '') => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/v1/movies/search-movies?query=${query}`
            );
            const data = await response.json();
            setMovies(data.movies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        // Fetch all movies initially
        fetchMovies();
    }, []);

    // Handle search input
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);

        // Fetch filtered movies
        fetchMovies(query);
    };

    return (
        <div className="h-auto bg-black text-white">
            {/* Navbar */}
            {/* <Navbar /> */}

            {/* Background with search bar */}
            <div
                className="h-[80%] flex items-end justify-center"
                style={{
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-black bg-opacity-50 p-4 rounded-xl  w-full sm:w-[70%] md:w-[50%] lg:w-[40%]">
                    <input
                        type="text"
                        placeholder="Search Movies"
                        name="search"
                        value={search}
                        onChange={handleSearchChange}
                        className="p-3 w-full rounded-md text-black text-lg"
                    />
                </div>
            </div>

            {/* Movie Cards Section */}
            <MovieCard movies={movies} />

            {/* <Footer/> */}
        </div>
    );
};

export default Home;
