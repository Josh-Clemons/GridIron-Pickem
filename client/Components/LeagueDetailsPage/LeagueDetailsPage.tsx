import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// use params to get league details
// send saga dispatch, need entire league details (all picks for all users)
// update state
// bring in from store to handle calculations

const LeagueDetailsPage = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const store: any = useSelector(store => store);

    useEffect(() => {
        dispatch({ type: 'FETCH_LEAGUE_DETAIL', payload: id })
    }, []);


    return (
        <Container>
            <Box className='detailHeader' >
                <Typography textAlign={'center'} variant='h5'>League {id} Details</Typography>
            </Box>


            <Button variant="contained" href="#/dashboard" sx={{ width: "250px", color: "white", bgcolor: "text.primary" }}>Back to My Leagues</Button>
            {JSON.stringify(store.leagues.leagueDetail)}
        </Container>

    )
}

export default LeagueDetailsPage;