import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';


// use params to get league details
// send saga dispatch, need entire league details (all picks for all users)
// update state
// bring in from store to handle calculations

const LeagueDetailsPage = () => {

    const { id } = useParams();

    return (
        <div>LeagueDetailsPage, current league id: {id}
            <Button variant="contained" href="#/dashboard" sx={{ width: "250px", color: "white", bgcolor: "text.primary" }}>Back to My Leagues</Button>
        </div>
    )
}

export default LeagueDetailsPage;