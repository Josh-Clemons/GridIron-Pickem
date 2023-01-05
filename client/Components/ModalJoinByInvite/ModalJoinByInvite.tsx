import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Store } from '../../../src/interfaces/interfaces';

const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// takes the old league name as a prop to pre-populate input text
const ModalJoinByInvite: React.FC = () => {
    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;

    const [inviteCode, setInviteCode] = React.useState<string>('');
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch({ type: 'FETCH_LEAGUE_ID', payload: inviteCode})
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} color={'success'} sx={{ width: 250, mb: 2 }}>Join by Invite Code</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Typography id="inviteCodeTitle" variant="h6" component="h2">
                        Enter Invite Code
                    </Typography>
                    <TextField
                        required
                        id="inviteCodeInput"
                        label="Invite Code"
                        placeholder="Invite Code"
                        onChange={(e) => setInviteCode(e.target.value)}
                        sx={{
                            backgroundColor: 'black',
                            margin: 2.5,
                            marginTop: 4,
                            width: '95%'
                        }}
                    />
                    <Stack spacing={1} direction='row-reverse'>
                        <Button variant='outlined' color={'success'} onClick={handleSubmit} sx={{ width: 80 }}>Go</Button>
                        <Button variant='outlined' color={'error'} onClick={handleClose} sx={{ width: 80 }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalJoinByInvite;