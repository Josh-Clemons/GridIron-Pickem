import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';

const FindLeagueButton = () => {
    return (
        <Button variant="outlined" color="success" href="#/find" sx={{ width: 250, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>Find A League<SearchIcon sx={{ ml: 2 }} /></Button>
    )
}

export default FindLeagueButton;