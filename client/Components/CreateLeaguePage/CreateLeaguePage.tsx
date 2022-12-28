import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateLeaguePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // input state tracking
    const [leagueName, setLeagueName] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log('in create league handle submit, league name:', leagueName);
        // through this dispatch chain, league is created, user is added as a member, redux is updated
        dispatch({ type: 'CREATE_LEAGUE', payload: leagueName });
        navigate('/dashboard');
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
                        backgroundColor: 'black',
                        margin: 2.5,
                        marginTop: 4
                    }}
                />
                <Button variant="outlined" color="warning" type="submit" sx={{ width: "250px", marginTop: "10px", marginBottom: "8px" }}>Create</Button>
            </Box>
            <Button variant="outlined" href="#/dashboard" sx={{ width: "250px", position: "fixed", bottom: 40 }}>My Leagues</Button>
        </Container>
    )
}

export default CreateLeaguePage;