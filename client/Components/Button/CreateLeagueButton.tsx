import { Button } from '@mui/material';
import React from 'react';

const CreateLeagueButton = () => {
    return (
        <Button variant="outlined" color="warning" href="#/create" sx={{ width: 250, m: 1 }}>Create A League</Button>
    )
}

export default CreateLeagueButton;