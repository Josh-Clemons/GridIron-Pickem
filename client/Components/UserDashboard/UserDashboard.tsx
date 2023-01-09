import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LeagueItem from '../LeagueItem/LeagueItem';
import CreateLeagueButton from '../Button/CreateLeagueButton';
import FindLeagueButton from '../Button/FindLeagueButton';
import Box from '@mui/material/Box';
import { Paper, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Store, UserLeagues } from '../../../src/interfaces/interfaces';




// Displays a list of the users current leagues
const UserDashboard: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;
    const allLeagues: UserLeagues[] = store.leagues.userLeagues;
    const myLeagues: UserLeagues[] = allLeagues.filter((e) => e.owner_id === store.user.id);
    const othersLeagues: UserLeagues[] = allLeagues.filter((e) => e.owner_id !== store.user.id);

    // grabs league info on page load
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
                justifyContent: "center",
                maxWidth: 600
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
                {/* If user has no leagues, display the find/create league buttons, otherwise display the leagues they are in */}
                {!allLeagues[0] ?
                    <Stack direction={'column'} alignItems={'center'}>
                        <FindLeagueButton />
                        <CreateLeagueButton />
                    </Stack>
                    :
                    <>
                        {myLeagues[0] ?
                            <>
                                <Typography variant='h6'>Leagues I Manage:</Typography>
                                <Box sx={{ mb: 2 }}>
                                    {myLeagues.map(league => {
                                        return (
                                            <Box onClick={() => { leagueClick(league) }} key={league.id}>
                                                <LeagueItem league={league} />
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </>
                            :
                            null
                        }

                        <Typography variant='h6'>Leagues I'm In:</Typography>
                        <Box>
                            {othersLeagues.map(league => {
                                return (
                                    <Box onClick={() => { leagueClick(league) }} key={league.id}>
                                        <LeagueItem league={league} />
                                    </Box>
                                )
                            })}
                        </Box>
                    </>
                }
            </Box>
        </Container>
    )
}

export default UserDashboard;