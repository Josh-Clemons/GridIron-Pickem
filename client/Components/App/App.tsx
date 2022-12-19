import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// components and pages
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import Playground from '../Playground/Playground';
import UserDashboard from '../UserDashboard/UserDashboard';



const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER' });
    }, []);

    const store: any = useSelector(store => store);

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Navigate replace to="/home" />} />
                <Route path='/home' element={<LandingPage />} />
                <Route path='/register' element={store.user.id ? <Navigate replace to="/home" /> : <RegisterPage />} />
                <Route path='/login' element={store.user.id ? <Navigate replace to="/home" /> : <LoginPage />} />
                <Route path='/playground' element={<Playground />} />
                <Route path='/dashboard' element={<UserDashboard />} />
            </Routes>
            <Footer />
            {JSON.stringify(store)}
        </Router>
    );
};

export default App;