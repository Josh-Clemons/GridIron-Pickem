import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import LeagueItem from '../LeagueItem/LeagueItem';
import RefreshApiData from '../RefreshApiData/RefreshApiData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UserDashboard: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store: any = useSelector(store => store)
    const myLeagues: any = store.leagues.userLeagues;

    useEffect(() => {
        dispatch({ type: 'FETCH_LEAGUES' });
        dispatch({ type: 'GET_API_DATA' });
    }, []);

    // redirects to league detail page when a user clicks on a league item
    const leagueClick = (league) => {
        navigate(`/detail/${league.league_id}`)
    };

    return (

        <Container

            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Typography variant="h4">My Dashboard</Typography>

            <Stack
                spacing={1}
                direction="row"
                sx={{
                    width: '92%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: '8px',
                    mb: '8px'
                }}
            >
                <Button variant="contained" color="primary" href="#/find" sx={{ width: "45%" }}>Find League</Button>
                <Button variant="contained" color="warning" href="#/create" sx={{ width: "45%" }}>Create League</Button>
            </Stack>

            <Box
                width={"100%"}
                height={"75vh"}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                }}
            >

                <Typography variant='h6'>My Leagues:</Typography>
                <Box
                    sx={{
                        pb: '80px',
                    }}
                >
                    {myLeagues.map(league => {
                        return (
                            <div onClick={() => { leagueClick(league) }} key={league.league_id}>
                                <LeagueItem league={league} />
                            </div>
                        )


                    })}
                </Box>
            </Box>
            <RefreshApiData />
        </Container>
    )
}

export default UserDashboard;