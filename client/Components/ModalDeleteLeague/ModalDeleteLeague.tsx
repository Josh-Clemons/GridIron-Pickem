import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalDeleteLeague = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // open, handleOpen/Close are all used to control the modal
    const [open, setOpen] = React.useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { id } = useParams();

    // sends league ID as payload to know what to delete, server confirms user making request is league owner
    const handleSubmit = (event: any) => {
        event.preventDefault();
        dispatch({ type: 'DELETE_LEAGUE', payload: id });
        navigate('/dashboard');
    };

    return (
        <Box>
            <Button variant="outlined" onClick={handleOpen} color={'error'} size='small' sx={{ width: 130, m: 1 }}>DELETE</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component='form' onSubmit={handleSubmit}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete?
                    </Typography>
                    <Stack spacing={1} p={2} direction='row-reverse'>
                        <Button variant='outlined' color={'error'} onClick={handleSubmit} sx={{ width: 80 }}>Yes</Button>
                        <Button variant='outlined' color={'warning'} onClick={handleClose} sx={{ width: 80 }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalDeleteLeague;