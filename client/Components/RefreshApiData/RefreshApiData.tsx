import React from 'react';

import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';


const RefreshApiData = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch({ type: 'SET_API_DATA' });
        console.log('in handle click, dispatched request to update api data');
    };

    return (
        <Button variant='contained' onClick={handleClick}>Refresh Stats</Button>
    )
};

export default RefreshApiData;