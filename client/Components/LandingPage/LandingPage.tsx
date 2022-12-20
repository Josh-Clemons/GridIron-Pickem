import React from 'react';
import { teal } from '@mui/material/colors';

const color = teal[50];



const LandingPage = () => {
    return (
        <div
            className='landingPageDiv'
            style={{
                backgroundColor: color,
                backgroundSize: "cover",
                height: "70vh"
            }}
        >
            LandingPage
            <img src="/client/images/football_player_shadow.jpeg" alt="football Image" />
        </div>
    )
}

export default LandingPage;