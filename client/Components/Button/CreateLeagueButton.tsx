import { Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import React from 'react';

const CreateLeagueButton = () => {
    return (
        <Button variant="outlined" color="warning" href="#/create" sx={{ width: 250, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>Create A League<CreateIcon sx={{ ml: 2 }} /></Button>
    )
}

export default CreateLeagueButton;