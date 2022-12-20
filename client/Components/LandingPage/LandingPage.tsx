import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import bgImg from '/public/football_player_shadow.jpeg';




const LandingPage = () => {
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
        >
            <h2 style={{ backgroundColor: "black", borderRadius: 4 }}>Pick NFL Winners Against Your Friends!</h2>
            <br />
            <br />
            <Stack spacing={1} direction="column">
                <Button variant="contained" color="success" href="#/login" sx={{ width: "250px" }}>Login</Button>
                <Button variant="contained" color="info" href="#/register" sx={{ width: "250px" }}>Register</Button>
                <Button variant="contained" href="#/rules" sx={{ width: "250px", bgcolor: "darkgray", color: "white" }}>Rules</Button>
            </Stack>
        </Box>
    )
}

export default LandingPage;