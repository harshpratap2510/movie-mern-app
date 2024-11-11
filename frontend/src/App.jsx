// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Home from './pages/Home';
import AdminSignup from "./pages/admin/adminSignup"
import AdminSignin from './pages/admin/adminSignin';

function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/admin-signup" element={<AdminSignup/>} />
                <Route path="/admin-signin" element={<AdminSignin/>} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                {/* other routes can go here */}
            </Routes>
        </Router>
    );
}

export default App;
