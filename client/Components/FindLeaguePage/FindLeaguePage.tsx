import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FindLeaguePage = () => {
    return (
        <Container
            sx={{
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                textAlign: "center"
            }}
        >
            <Typography variant="h4">Find a New League</Typography>
            <Box height={"300px"} sx={{ backgroundColor: "white" }} mb={"20px"} >
                <ul style={{ width: "70vw", textAlign: "left" }} >Available Leagues
                    <li>Placeholder: League 1</li>
                    <li>Placeholder: League 2</li>
                    <li>Placeholder: league 3</li>
                </ul>
            </Box>
            <Button variant="contained" href="#/dashboard" sx={{ width: "250px", color: "white", bgcolor: "text.primary" }}>Back to My Leagues</Button>
        </Container>
    )
}

export default FindLeaguePage;