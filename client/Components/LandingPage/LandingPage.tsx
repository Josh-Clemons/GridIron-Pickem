import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Store } from '../../../src/interfaces/interfaces';

import ModalRules from '../ModalRules/ModalRules';
import bgImg from '/public/football_player_shadow.jpeg';

import GridViewIcon from '@mui/icons-material/GridView';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';




const LandingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store: Store = useSelector(store => store) as Store;

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/home');
    }

    return (
        <Box
            className='landingPageDiv'
            sx={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                height: "80vh",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                padding: "10px",
                textAlign: "center"
            }}
        >   <Box sx={{ backgroundColor: "#0B132B", color: '#5BC0BE', p: 2, opacity: '90%', borderRadius: 4 }}>
                <Typography variant='h3'>Welcome to the <Box component='span'>Grid Iron</Box></Typography>
                <Typography variant='h5' sx={{ color: 'white' }}>Pick NFL Winners Against Your Friends!</Typography>
            </Box>
            <br />
            <br />
            <Stack spacing={1} direction="column">
                {/* button options change if user is logged in */}
                {!store.user.id
                    ?
                    <>
                        <Button variant="contained" color="success" href="#/login" sx={{ width: "250px" }}>Login<LoginIcon sx={{ ml: 2 }} /></Button>
                        <Button variant="contained" color="info" href="#/register" sx={{ width: "250px" }}>Register<HowToRegIcon sx={{ ml: 2 }} /></Button>
                    </>
                    :
                    <>
                        <Button variant="contained" color="success" href="#/dashboard" sx={{ width: "250px" }}>Dashboard<GridViewIcon sx={{ ml: 2 }} /></Button>
                        <Button variant="contained" color="error" onClick={logout} sx={{ width: "250px" }}>Logout<LogoutIcon sx={{ ml: 2 }} /></Button>
                    </>
                }
                <ModalRules size={'medium'} variant={'contained'} width={'250px'} />
            </Stack>
        </Box>
    )
}

export default LandingPage;