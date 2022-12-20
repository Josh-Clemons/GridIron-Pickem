import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CreateLeaguePage = () => {
    const [leagueName, setLeagueName ] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('in create league handle submit, league name:', leagueName);
    };

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
            <Typography variant="h4">Create a New League</Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="leagueName"
                    label="League Name"
                    placeholder="League Name"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                    sx={{
                        backgroundColor: "white",
                        margin: "10px",
                        marginTop: "2em"
                    }}
                />
                <Button variant="contained" color="warning" type="submit" sx={{ width: "250px", marginTop: "100px" }}>Create</Button>
            </Box>
            <Button variant="contained" color="info" href="#/dashboard" sx={{ width: "250px", marginTop: "8px" }}>Back to My Leagues</Button>
        </Container>
    )
}

export default CreateLeaguePage;