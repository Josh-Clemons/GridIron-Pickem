import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import LeagueItem from '../LeagueItem/LeagueItem';

const UserDashboard: React.FC = () => {

    const store:any = useSelector(store => store)
    const myLeagues:any = store.leagues.userLeagues;

    const leagueClick = (league) => {
        console.log('in leagueClick, league details:', league);
    };

    return (

        <Container

            sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <Typography variant="h4">My Dashboard</Typography>
            <Box 
                width={"100%"} 
                height={"75vh"}
                sx={{
                    backgroundColor: "gray",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <Box height={"300px"} sx={{ backgroundColor: "white" }} mb={"20px"} >
                    {myLeagues.map( league => {
                        return (
                            <div onClick={() => {leagueClick(league)}} key={league.league_id}>
                                <LeagueItem league={league}/>
                            </div>
                        )

                        
                    })}
                </Box>
                <Stack spacing={1} direction="column">
                    <Button variant="contained" color="primary" href="#/find" sx={{ width: "250px" }}>Find League</Button>
                    <Button variant="contained" color="warning" href="#/create" sx={{ width: "250px" }}>Create League</Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default UserDashboard;