import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LeagueItem from '../LeagueItem/LeagueItem';
import ModalJoinByInvite from '../ModalJoinByInvite/ModalJoinByInvite';
import CreateLeagueButton from '../Button/CreateLeagueButton';

import { AvailableLeagues, Store, User } from '../../../src/interfaces/interfaces';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FindLeaguePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store: Store = useSelector(store => store) as Store;
    const availableLeagues: AvailableLeagues[] = store.leagues.availableLeagues;


    // gets available leagues on page load
    useEffect(() => {
        dispatch({ type: 'FETCH_AVAILABLE_LEAGUES' });
    }, []);

    // redirects to league detail page when a user clicks on a league item
    const leagueClick = (league: AvailableLeagues) => {
        navigate(`/detail/${league.id}`)
    };


    // returns a list of available leagues, excludes leagues the user is currently in
    return (
        <Box
            sx={{

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                textAlign: "center",
                maxWidth: 600,
                margin: 'auto'
            }}
        >
            <Typography variant="h4" color='primary.main'>Find a New League</Typography>
            <CreateLeagueButton />
            <ModalJoinByInvite />
            <Typography variant='h6' color='primary.main' sx={{ textDecoration: 'underline' }}>Public Leagues:</Typography>
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
        </Box>
    )
}

export default FindLeaguePage;