// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import AdminSignup from "./pages/admin/adminSignup"
import AdminSignin from './pages/admin/adminSignin';
import Dashboard from './pages/admin/Dashboard';
import CreateMovie from './pages/movie/createMovie';
import AllMovies from './pages/movie/AllMovies';
import UpdateMovie from './pages/movie/updateMovie';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/admin-signup" element={<AdminSignup/>} />
                <Route path="/admin-signin" element={<AdminSignin/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/dashboard" element={<Dashboard />} /> 
                <Route path="/create-movie" element={<CreateMovie />} /> 
                <Route path="/all-movies" element={<AllMovies />} /> 
                <Route path="/update-movie/:movieId" element={<UpdateMovie />} /> 
                
                {/* other routes can go here */}
            </Routes>
        </Router>
    );
}

export default App;
