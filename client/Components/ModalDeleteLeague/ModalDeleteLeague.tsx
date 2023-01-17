import React from 'react'
import Box from '@mui/material/Box';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


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

const ModalDeleteLeague: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // open, handleOpen/Close are all used to control the modal
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id } = useParams();

    // sends league ID as payload to know what to delete, server confirms user making request is league owner
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch({ type: 'DELETE_LEAGUE', payload: id });
        navigate('/dashboard');
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} color={'error'} size='small' sx={{ width: 125, m: 1, borderWidth: 2, '&:hover': { borderWidth: '2px' } }}>DELETE<DeleteOutlineOutlinedIcon sx={{ ml: 2 }} /></Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6">
                        Are you sure you want to delete?
                    </Typography>
                    <Stack spacing={1} p={2} direction='row-reverse'>
                        <Button variant='outlined' color={'error'} onClick={handleSubmit} sx={{ minWidth: 80, borderWidth: 2 }}>Yes<DeleteOutlineOutlinedIcon sx={{ ml: 1 }} /></Button>
                        <Button variant='outlined' color={'warning'} onClick={handleClose} sx={{ minWidth: 80, borderWidth: 2 }}>Cancel<ArrowBackIcon sx={{ ml: 1 }} /></Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalDeleteLeague;