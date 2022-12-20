import React from 'react';
// import CreateLeagueButton from '../CreateLeagueButton/CreateLeagueButton';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const UserDashboard: React.FC = () => {
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
                    <ul style={{ width: "70vw" }} >My Leagues:
                        <li>Placeholder: League 1</li>
                        <li>Placeholder: League 2</li>
                        <li>Placeholder: league 3</li>
                    </ul>
                </Box>
                <Stack spacing={1} direction="column">
                    <Button variant="contained" color="primary" href="#/find" sx={{ width: "250px" }}>Find League</Button>
                    {/* <CreateLeagueButton /> */}
                    <Button variant="contained" color="warning" href="#/create" sx={{ width: "250px" }}>Create League</Button>
                </Stack>
            </Box>
        </Container>
    )
}

export default UserDashboard;