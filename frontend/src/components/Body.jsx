import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Home from '../pages/Home';
import AdminSignup from "../pages/admin/adminSignup"
import AdminSignin from '../pages/admin/adminSignin';
import Dashboard from '../pages/admin/Dashboard';
import CreateMovie from '../pages/movie/createMovie';
import AllMovies from '../pages/movie/AllMovies';
import UpdateMovie from '../pages/movie/updateMovie';
import Profile from '../pages/profile';
import AdminProfile from '../pages/admin/adminProfile';
import MovieDetail from '../pages/movie/movieDetail';
import About from '../pages/about';
const Body = () => {
    return (

        <>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/admin-signup" element={<AdminSignup />} />
                <Route path="/admin-signin" element={<AdminSignin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/create-movie" element={<CreateMovie />} />
                <Route path="/all-movies" element={<AllMovies />} />
                <Route path="/update-movie/:movieId" element={<UpdateMovie />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/movie-detail/:movieId" element={<MovieDetail />} />
                <Route path="/user-profile" element={<Profile />} />
                <Route path="/about" element={<About />} />

            </Routes>
        </>
    )
}

export default Body
