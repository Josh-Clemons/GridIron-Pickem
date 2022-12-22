import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const LeagueDetailsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const store: any = useSelector(store => store);
    const leagueDetail = store.leagues.leagueDetail;
    const leagueUsers = store.leagues.currentLeagueUsers;
    const [isMember, setIsMember] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);


    useEffect(() => {
        dispatch({ type: 'FETCH_LEAGUE_DETAIL', payload: id });
    }, []);

    // when league detail is changed, check if user is member or admin
    useEffect(() => {
        setMember();
    }, [leagueDetail]);

    const deleteLeague = () => {
        dispatch({ type: 'DELETE_LEAGUE', payload: id });
        navigate('/dashboard');
    }

    const joinLeague = () => {
        dispatch({ type: 'CREATE_PICKS', payload: id });
        navigate('/dashboard');
    }

    const leaveLeague = () => {
        dispatch({ type: 'LEAVE_LEAGUE', payload: id });
        navigate('/dashboard');
    }

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
        <Container>
            <Box className='detailHeader' >
                <Typography textAlign={'center'} variant='h5'>Id: {id} Details</Typography>
                <Typography textAlign={'center'} variant='h4'>League Name: {leagueDetail[0]?.league_name}</Typography>
            </Box>
            {leagueUsers.map((user) => {
                return <Box key={user.username}>Username: {user.username}</Box>
            })}

            <Stack spacing={1} direction="column">
                {isAdmin
                    ?
                    <>
                        <Button variant="contained" onClick={deleteLeague} color={'error'} sx={{ width: "250px" }}>DELETE League</Button>
                    </>
                    :
                    <>
                        {isMember ?
                            <>
                                <Button variant="contained" onClick={leaveLeague} color={'error'} sx={{ width: "250px" }}>Leave League</Button>
                            </>
                            :
                            <>
                                <Button variant="contained" onClick={joinLeague} sx={{ width: "250px", color: "white", bgcolor: "primary.main" }}>Join League</Button>
                            </>
                        }
                    </>
                }

                <Button variant="contained" href="#/dashboard" sx={{ width: "250px", color: "white", bgcolor: "text.primary" }}>Back to My Leagues</Button>
            </Stack>
        </Container>

    )
}

export default LeagueDetailsPage;