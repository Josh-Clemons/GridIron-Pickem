import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Switch } from '@mui/material';


const CreateLeaguePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // variable to hold input text value
    const [leagueName, setLeagueName] = React.useState<string>('');
    const [isPrivate, setIsPrivate] = React.useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inviteCode: string = makeId(6);
        // through this dispatch chain, league is created, user is added as a member, redux is updated
        dispatch({ type: 'CREATE_LEAGUE', payload: { leagueName, inviteCode, isPrivate } })
        navigate('/dashboard');
    };

    const handleIsPrivate = (event: any) => {
        setIsPrivate(event.target.checked)
    }

    // makes a random string that is used as an invite code
    const makeId = (length: number) => {
        let result: string = '';
        const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength: number = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        };
        return result;
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
                textAlign: "center",
                maxWidth: 600
            }}
        >
            <Typography variant="h4">Create a New League</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', mb: 2 }}>
                    <Typography variant='body1'>Set to Private:</Typography>
                    <Switch checked={isPrivate} onClick={handleIsPrivate} />
                    <Typography variant='body1' width={30}>{isPrivate ? 'Yes' : 'No'}</Typography>
                </Box>
                <Button variant="outlined" color="warning" type="submit" sx={{ width: "250px", marginTop: "10px", marginBottom: "8px", borderWidth: 2 }}>Create<AddCircleIcon sx={{ ml: 2 }} /></Button>
            </Box>
            <Button variant="outlined" href="#/dashboard" sx={{ width: "250px", position: "fixed", bottom: 60, borderWidth: 2 }}>My Leagues<ArrowBackIcon sx={{ ml: 2 }} /></Button>
        </Container>
    )
}

export default CreateLeaguePage;