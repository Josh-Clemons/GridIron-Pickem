import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import './App.css';

// components and pages
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import UserDashboard from '../UserDashboard/UserDashboard';
import FindLeaguePage from '../FindLeaguePage/FindLeaguePage';
import CreateLeaguePage from '../CreateLeaguePage/CreateLeaguePage';

const App: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_USER' });
    }, []);

    const store: any = useSelector(store => store);

    return (
        <div className='appDiv'>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path='/home' element={<LandingPage />} />
                    <Route path='/register' element={store.user.id ? <Navigate replace to="/dashboard" /> : <RegisterPage />} />
                    <Route path='/login' element={store.user.id ? <Navigate replace to="/dashboard" /> : <LoginPage />} />
                    <Route path='/dashboard' element={store.user.id ? <UserDashboard /> : <Navigate replace to="/login" />} />
                    <Route path='/find' element={store.user.id ? <FindLeaguePage /> : <Navigate replace to="/login" />} />
                    <Route path='/create' element={store.user.id ? <CreateLeaguePage /> : <Navigate replace to="/login" />} />
                </Routes>
                <Footer />
                {/* {JSON.stringify(store)} */}
            </Router>
        </div>
    );
};

export default App;