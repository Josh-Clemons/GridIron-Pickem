import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



const CreateLeagueButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const modalBody = () => {
        <div>Modal Body</div>
    }

    return (
        <div>
            <Button variant="contained" color="warning" onClick={handleOpen}>Create a League</Button>
            <Modal open={open} onClose={handleClose}>
                <div>Modal Body</div>
            </Modal>
        </div>
    )
}

export default CreateLeagueButton;