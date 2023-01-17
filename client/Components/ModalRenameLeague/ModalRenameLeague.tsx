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
    maxWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

// takes the old league name as a prop to pre-populate input text
const ModalRenameLeague: React.FC = () => {
    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;

    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [leagueName, setLeagueName] = React.useState<string>('');
    const { id } = useParams();

    // updates leagueName when leagueDetails change
    useEffect(() => {
        setLeagueName(store.leagues.leagueDetail[0].league_name);
    }, [store.leagues.leagueDetail]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // confirms new league name is not blank before submitting to the server, if it is, the modal closes
        if (leagueName !== '') {
            dispatch({ type: 'RENAME_LEAGUE', payload: { name: leagueName, id: id } });
            handleClose();

        } else {
            handleClose();
        };
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} color={'warning'} size='small' sx={{ width: 125, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>Rename<DriveFileRenameOutlineIcon sx={{ ml: 2 }} /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter New Name
                    </Typography>
                    <TextField
                        required
                        id="newLeagueName"
                        label="League Name"
                        placeholder="League Name"
                        value={leagueName}
                        onChange={(e) => setLeagueName(e.target.value)}
                        sx={{
                            backgroundColor: 'black',
                            margin: 2.5,
                            marginTop: 4,
                            width: '95%'
                        }}
                    />
                    <Stack spacing={1} direction='row-reverse'>
                        <Button variant='outlined' color={'success'} onClick={handleSubmit} sx={{ width: 80 }}>Save</Button>
                        <Button variant='outlined' color={'error'} onClick={handleClose} sx={{ width: 80 }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalRenameLeague;