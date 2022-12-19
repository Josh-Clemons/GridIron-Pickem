import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// components and pages
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import Playground from '../Playground/Playground';
import { useSelector } from 'react-redux';



const App: React.FC = () => {

    const store = useSelector(store => store);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/playground' element={<Playground />} />
            </Routes>
            <Footer />
            {JSON.stringify(store)}
        </Router>
    );
};

export default App;