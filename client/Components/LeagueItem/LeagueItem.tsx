import React from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const LeagueItem = (league) => {
    return (
        <Box
            component={Paper}
            elevation={12}
            sx={{
                height: '2em',
                mt: '.5em',
                pt: '.5em',
                textAlign: 'center',
            }}
        >
            {league.league.league_name}
        </Box>
    );
};

export default LeagueItem;