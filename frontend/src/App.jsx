// src/App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {

    return (
        <Router>
            {/* <Navbar/> */}

                <Body/>
            <Footer/>
        </Router>
    );
}

export default App;
