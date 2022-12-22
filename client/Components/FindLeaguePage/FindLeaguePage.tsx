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
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                textAlign: "center"
            }}
        >
            <Typography variant="h4">Find a New League</Typography>
            <Box height={"300px"} sx={{ backgroundColor: "white" }} mb={"20px"} >
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


            <Stack
                spacing={1}
                direction="column"
                sx={{
                    position: 'fixed',
                    bottom: 100
                }}
            >
                <Button variant="contained" href="#/dashboard" sx={{ width: "250px", color: "white", bgcolor: "text.primary" }}>My Leagues</Button>
            </Stack>
        </Container>
    )
}

export default FindLeaguePage;