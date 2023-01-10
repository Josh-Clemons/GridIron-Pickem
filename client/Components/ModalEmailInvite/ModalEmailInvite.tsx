import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
const ModalEmailInvite: React.FC = () => {
    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;

    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [emailAddress, setEmailAddress] = React.useState<string>('');
    const { id } = useParams();


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (emailAddress !== '') { // find a better way to confirm they entered a legit email
            dispatch({ type: 'SEND_INVITE', payload: { emailAddress, leagueId: id, leagueName: store.leagues.leagueDetail[0].league_name } });
            handleClose();
            setEmailAddress('');

        } else {
            handleClose();
        };
    };

    return (
        <Box>
            <Typography fontSize={18} onClick={handleOpen} color={'primary'} sx={{ width: 250, mb: 1, mt: 1 }}>Invite Friend by Email</Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter email address to invite:
                    </Typography>
                    <TextField
                        required
                        id="inviteEmailAddress"
                        label="Email Address"
                        placeholder="example@gmail.com"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        sx={{
                            backgroundColor: 'black',
                            margin: 2.5,
                            marginTop: 4,
                            width: '95%'
                        }}
                    />
                    <Stack spacing={1} direction='row-reverse'>
                        <Button variant='outlined' color={'success'} onClick={handleSubmit} sx={{ width: 80 }}>Send</Button>
                        <Button variant='outlined' color={'error'} onClick={handleClose} sx={{ width: 80 }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalEmailInvite;