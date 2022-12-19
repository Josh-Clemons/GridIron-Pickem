import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// components and pages
import NavBar from '../NavBar/NavBar';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';



const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default App;