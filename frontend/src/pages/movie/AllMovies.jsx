import React, { useState, useEffect } from 'react';
import ModMovieCard from '../../components/ModifiedMovieCard';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState(""); // State for search query

    // Fetch movies based on the search term
    const fetchMovies = async (query = "") => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/movies/search-movies?query=${query}`);
            const data = await response.json();
            if (response.ok) {
                setMovies(data.movies);  // Set the filtered movies list
            } else {
                console.error("Error fetching movies:", data.message);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Fetch all movies initially or when the search query changes
    useEffect(() => {
        fetchMovies(search); // Fetch movies based on search
    }, [search]); // Re-run the effect when the search query changes

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Update search state
    };

    return (
        <div className="bg-black h-fit min-h-screen w-full">
            {/* Search Bar */}
            <div className="p-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={search}
                    onChange={handleSearchChange}
                    className="p-3 w-full max-w-md rounded-md text-black text-lg"
                />
            </div>

            {/* Movie Cards Section */}
            <ModMovieCard movies={movies} setMovies={setMovies} />
        </div>
    );
};

export default AllMovies;
