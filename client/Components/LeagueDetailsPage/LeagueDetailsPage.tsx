import React, { useEffect, useState } from 'react';
// const nodemailer = require('nodemailer');

import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Store, LeagueDetail, LeagueUsers } from '../../../src/interfaces/interfaces';

import LeagueStandings from '../LeagueStandings/LeagueStandings';
import Picks from '../Picks/Picks';
import LeaguePicks from '../LeaguePicks/LeaguePicks';
import LeagueDetailsAccordion from '../LeagueDetailsAccordion/LeagueDetailsAccordion';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PicksCommissioner from '../PicksCommissioner/PicksCommissioner';




const LeagueDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const store: Store = useSelector(store => store) as Store;
    const leagueDetail: LeagueDetail[] = store.leagues.leagueDetail;
    const leagueUsers: LeagueUsers[] = store.leagues.currentLeagueUsers;

    // tracks member details so correct button and component options appear
    const [isMember, setIsMember] = React.useState<boolean>(false);
    const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

    // used for determining which league detail component is displayed
    const [viewState, setViewState] = useState<string>('standings');


    useEffect(() => {
        dispatch({ type: 'FETCH_LEAGUE_DETAIL', payload: id });
        dispatch({ type: 'GET_API_DATA' });
    }, []);


    // when league detail is changed, check if user is member or admin
    useEffect(() => {
        setMember();
    }, [leagueDetail]);

    const inviteMember = () => {
        dispatch({ type: 'SEND_INVITE' });
    };


    // sets member type so appropriate options are displayed
    const setMember = () => {
        if (leagueDetail.filter(e => e.owner_id === store.user.id).length > 0) {
            setIsMember(false);
            setIsAdmin(true);
        } else if (leagueUsers.filter(e => e.id === store.user.id).length > 0) {
            setIsMember(true);
            setIsAdmin(false);
        } else {
            setIsAdmin(false);
            setIsMember(false);
        };
    };




    return (
        <Box
            maxWidth={600}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
                pl: 1,
                margin: 'auto'
            }}
        >
            <Box
                m={3}
                p={2}
                width={'100%'}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    bgcolor: "#1C2541"
                }}
            >
                <Typography onClick={inviteMember} textAlign={'center'} variant='h6' fontSize={'16'}>League Name: <Box fontSize={30} m={1}>{leagueDetail[0]?.league_name}</Box></Typography>
                <Stack
                    direction="row"
                    sx={{
                        width: '92%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        m: 1
                    }}
                >
                    {isAdmin || isMember
                        ?
                        <>
                            <Button variant="outlined" href="#/dashboard" size='small' sx={{ width: 125, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>Back<ArrowBackIcon sx={{ ml: 2 }} /></Button>
                        </>
                        :
                        <>
                            <Button variant="outlined" href="#/find" size='small' sx={{ width: 125, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>Back<ArrowBackIcon sx={{ ml: 2 }} /></Button>
                        </>
                    }
                </Stack>
                <LeagueDetailsAccordion />
            </Box>

            <ButtonGroup
                variant="text"
                aria-label="text button group"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '90%',
                    maxWidth: 600,
                    mt: 2,
                    mb: 2
                }}
            >
                <Button onClick={() => setViewState('standings')} sx={{ width: '30%' }}>Standings</Button>
                {(isMember || isAdmin) && <Button onClick={() => setViewState('Picks')} sx={{ width: '30%' }}>Picks</Button>}
                {(isMember || isAdmin) && <Button onClick={() => setViewState('overview')} sx={{ width: '30%' }}>Overview</Button>}

            </ButtonGroup>



            {/* Shows a different component contingent on the choice the user makes, starts at league standings */}
            {viewState === 'standings' && <LeagueStandings />}
            {(viewState === 'Picks' && isMember) && <Picks />}
            {(viewState === 'Picks' && isAdmin) && <PicksCommissioner />}
            {viewState === 'overview' && <LeaguePicks />}

        </Box>

    )
}

export default LeagueDetailsPage;