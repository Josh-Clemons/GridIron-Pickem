import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';


const LeagueStandings = () => {
    const store: any = useSelector(store => store);
    const leagueUsers = store.leagues.currentLeagueUsers;



    return (
        <Box> Users:
            {leagueUsers.map((user) => {
                return <Box key={user.username}>{user.username}</Box>
            })}
        </Box>
    )
}

export default LeagueStandings;