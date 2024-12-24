import React, { useState, useEffect } from 'react';
import ModMovieCard from '../../components/ModifiedMovieCard';
const BASE_URL=import.meta.env.VITE_BASE_URL

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");  

     
    const fetchMovies = async (query = "") => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/movies/search-movies?query=${query}`);
            const data = await response.json();
            if (response.ok) {
                setMovies(data.movies);   
            } else {
                console.error("Error fetching movies:", data.message);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    
    useEffect(() => {
        fetchMovies(search);  
    }, [search]);  
 
    const handleSearchChange = (e) => {
        setSearch(e.target.value);  
    };

    return (
        <div className="bg-black h-fit min-h-screen w-full">
           
            <div className="p-4 flex justify-center">
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={search}
                    onChange={handleSearchChange}
                    className="p-3 w-full max-w-md rounded-md text-black text-lg"
                />
            </div>
 
            <ModMovieCard movies={movies} setMovies={setMovies} />
        </div>
    );
};

export default AllMovies;
