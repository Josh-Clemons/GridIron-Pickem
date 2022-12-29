import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LeagueItem from '../LeagueItem/LeagueItem';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FindLeaguePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store: any = useSelector(store => store);
    const availableLeagues: any = store.leagues.availableLeagues;

    // gets available leagues on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_AVAILABLE_LEAGUES' });
    }, []);

    // redirects to league detail page when a user clicks on a league item
    const leagueClick = (league) => {
        navigate(`/detail/${league.id}`)
    };


    // returns a list of available leagues, excludes leagues the user is currently in
    return (
        <Container
            sx={{

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                textAlign: "center"
            }}
        >
            <Typography variant="h4" color='primary.main'>Find a New League</Typography>
            <Button variant="outlined" color="warning" href="#/create" sx={{ width: 250, m: 3 }}>Create A League</Button>
            <Typography variant='h6' color='primary.main' sx={{ textDecoration: 'underline' }}>Available Leagues:</Typography>
            <Box height={"75vh"} width={"92%"} >
                {availableLeagues.length > 0 ?
                    availableLeagues.map(league => {
                        if (league.user_array.includes(store.user.id)) {
                            return null;
                        };
                        return (
                            <div onClick={() => { leagueClick(league) }} key={league.id}>
                                <LeagueItem league={league} />
                            </div>
                        )
                    })
                    :
                    <Typography>Join or Create a league!</Typography>
                }
            </Box>
        </Container>
    )
}

export default FindLeaguePage;