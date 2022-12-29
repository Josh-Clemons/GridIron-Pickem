import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import LeagueStandings from '../LeagueStandings/LeagueStandings';
import MyPicks from '../MyPicks/MyPicks';
import LeaguePicks from '../LeaguePicks/LeaguePicks';
import ModalRenameLeague from '../ModalRenameLeague/ModalRenameLeague';
import ModalDeleteLeague from '../ModalDeleteLeague/ModalDeleteLeague';
import ModalLeaveLeague from '../ModalLeaveLeague/ModalLeaveLeague';
import ModalRules from '../ModalRules/ModalRules';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



const LeagueDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const store: any = useSelector(store => store);
    const leagueDetail = store.leagues.leagueDetail;
    const leagueUsers = store.leagues.currentLeagueUsers;

    // tracks member details so correct button and component options appear
    const [isMember, setIsMember] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

    // anyone can join
    const joinLeague = () => {
        dispatch({ type: 'CREATE_PICKS', payload: id });
        navigate('/dashboard');
    }

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
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pr: 1,
                pl: 1
            }}
        >
            <Box
                m={3}
                p={2}
                width={'95%'}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    bgcolor: "#1C2541"
                }}
            >
                <Typography textAlign={'center'} variant='body1'>League Name: <Box component='h2' m={1}>{leagueDetail[0]?.league_name}</Box></Typography>
                {/* Button group below, changes depending on whether user is owner/member */}
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
                    {isAdmin
                        ?
                        <>
                            <ModalDeleteLeague />
                            <ModalRenameLeague />
                            <ModalRules variant={'outlined'} size={'small'} width={130} margin={8} />
                            <Button variant="outlined" href="#/dashboard" size='small' sx={{ width: 130, m: 1 }}>My Leagues</Button>
                        </>
                        :
                        <>
                            {isMember ?
                                <>
                                    <ModalLeaveLeague />
                                    <ModalRules variant={'outlined'} size={'small'} width={130} margin={8} />
                                    <Button variant="outlined" href="#/dashboard" size='small' sx={{ width: 130, m: 1 }}>My Leagues</Button>
                                </>
                                :
                                <>
                                    <Button variant="outlined" onClick={joinLeague} size='small' sx={{ width: 130, color: "white", bgcolor: "primary.main", m: 1 }}>Join</Button>
                                    <Button variant="outlined" href="#/find" size='small' sx={{ width: 130, m: 1 }}>Back</Button>
                                </>
                            }
                        </>
                    }
                </Stack>
            </Box>

            <ButtonGroup
                variant="text"
                aria-label="text button group"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: '100vw',
                    mt: 2,
                    mb: 2
                }}
            >
                <Button onClick={() => setViewState('standings')} sx={{ width: '30%' }}>Standings</Button>
                {(isMember || isAdmin) && <Button onClick={() => setViewState('myPicks')} sx={{ width: '30%' }}>My Picks</Button>}
                {(isMember || isAdmin) && <Button onClick={() => setViewState('overview')} sx={{ width: '30%' }}>Overview</Button>}

            </ButtonGroup>



            {/* Shows a different component contingent on the choice the user makes, starts at league standings */}
            {viewState === 'standings' && <LeagueStandings />}
            {viewState === 'myPicks' && <MyPicks isAdmin={isAdmin}/>}
            {viewState === 'overview' && <LeaguePicks />}

        </Container>

    )
}

export default LeagueDetailsPage;