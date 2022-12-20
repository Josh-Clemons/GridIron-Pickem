import React from 'react';
import { teal } from '@mui/material/colors';
import bgImg from '/public/football_player_shadow.jpeg';

const color = teal[50];




const LandingPage = () => {
    return (
        <div
            className='landingPageDiv'
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: "cover",
                height: "70vh"
            }}
        >
            LandingPage
        </div>
    )
}

export default LandingPage;