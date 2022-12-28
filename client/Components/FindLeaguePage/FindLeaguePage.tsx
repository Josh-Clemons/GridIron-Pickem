import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import LeagueItem from '../LeagueItem/LeagueItem';
import { useNavigate } from 'react-router-dom';

const FindLeaguePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store: any = useSelector(store => store);
    const availableLeagues: any = store.leagues.availableLeagues;

    useEffect(() => {
        dispatch({ type: 'FETCH_AVAILABLE_LEAGUES' });
    }, [store.leagues.leagueDetail]);

    // redirects to league detail page when a user clicks on a league item
    const leagueClick = (league) => {
        navigate(`/detail/${league.id}`)
    };
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
            <Typography variant='h6' color='primary.main' sx={{ textDecoration: 'underline' }}>Available Leagues:</Typography>
            <Box height={"75vh"} width={"92%"} >
                {availableLeagues.map(league => {
                    if (league.user_array.includes(store.user.id)) {
                        return null;
                    };
                    return (
                        <div onClick={() => { leagueClick(league) }} key={league.id}>
                            <LeagueItem league={league} />
                        </div>
                    )
                })}
            </Box>
            <Button variant="outlined" color="warning" href="#/create" sx={{ width: "45%", position: "fixed", bottom: 40 }}>Create League</Button>
        </Container>
    )
}

export default FindLeaguePage;