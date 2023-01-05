import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LeagueItem from '../LeagueItem/LeagueItem';

import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Store, UserLeagues } from '../../../src/interfaces/interfaces';




// Displays a list of the users current leagues
const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;
    const myLeagues: UserLeagues[] = store.leagues.userLeagues;

    // grabs updated league info if league detail changes (ex. league name change)
    useEffect(() => {
        dispatch({ type: 'FETCH_LEAGUES' })
    }, [])


    // redirects to league detail page when a user clicks on a league item
    const leagueClick = (league: UserLeagues) => {
        navigate(`/detail/${league.id}`)
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
            <Typography sx={{ m: 2 }} variant="h4">Dashboard</Typography>
            <Box
                width={"100%"}
                height={"75vh"}
                component={Paper}
                borderRadius={4}
                p={3}
                mt={4}
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
                            <Box onClick={() => { leagueClick(league) }} key={league.id}>
                                <LeagueItem league={league} />
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        </Container>
    )
}

export default UserDashboard;