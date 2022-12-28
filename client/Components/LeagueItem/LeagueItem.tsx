import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const LeagueItem = (league) => {
    return (
        <Box
            component={Paper}
            elevation={20}
            sx={{
                height: '2em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                mb: 2
            }}
        >
            {league.league.league_name}
        </Box>
    );
};

export default LeagueItem;