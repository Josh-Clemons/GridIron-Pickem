import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';


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

const ModalRenameLeague = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setLeagueName('');
    };
    const [leagueName, setLeagueName] = React.useState('')
    const { id } = useParams();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (leagueName !== '') {
            dispatch({ type: 'RENAME_LEAGUE', payload: { name: leagueName, id: id } });
            handleClose();
        } else {
            handleClose();
        };
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} color={'warning'} size='small' sx={{ width: 130, m: 1 }}>Rename</Button>
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