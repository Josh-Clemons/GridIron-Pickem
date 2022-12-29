import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// components and pages
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import UserDashboard from '../UserDashboard/UserDashboard';
import FindLeaguePage from '../FindLeaguePage/FindLeaguePage';
import CreateLeaguePage from '../CreateLeaguePage/CreateLeaguePage';
import LeagueDetailsPage from '../LeagueDetailsPage/LeagueDetailsPage';
import AboutPage from '../AboutPage/AboutPage';

import CssBaseline from '@mui/material/CssBaseline';


const App: React.FC = () => {

    const user: { id: number, username: string } = useSelector((store: any) => store.user);

    return (
        <div className='appDiv'>
            <Router>
                <CssBaseline />
                <NavBar />
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} />
                    <Route path='/home' element={<LandingPage />} />
                    <Route path='/about' element={<AboutPage />} />
                    <Route path='/register' element={user.id ? <Navigate replace to="/dashboard" /> : <RegisterPage />} />
                    <Route path='/login' element={user.id ? <Navigate replace to="/dashboard" /> : <LoginPage />} />
                    <Route path='/dashboard' element={user.id ? <UserDashboard /> : <Navigate replace to="/login" />} />
                    <Route path='/find' element={user.id ? <FindLeaguePage /> : <Navigate replace to="/login" />} />
                    <Route path='/create' element={user.id ? <CreateLeaguePage /> : <Navigate replace to="/login" />} />
                    <Route path='/detail/:id' element={user.id ? <LeagueDetailsPage /> : <Navigate replace to="/login" />} />
                </Routes>
                <Footer />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </Router>
        </div>
    );
};

export default App;