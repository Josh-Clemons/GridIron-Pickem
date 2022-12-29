import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '95%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const ModalRules: any = ({ size, width, variant, margin }) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false) };


    return (
        <Box>
            <Button variant={variant} onClick={handleOpen} color={'secondary'} size={size} sx={{ width: { width }, margin: { margin } }}>Rules</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Rules:
                    </Typography>
                    <Typography variant='body1' paragraph={true} style={{ width: '95%', height: '60vh', overflow: 'auto' }}>
                        Each week, you must select 3 different teams to win their games.  Do not worry about point spreads.  You only need to select wins.
                        <br />
                        <br />
                        Selections MUST be made prior to the start of the Thursday night game.
                        <br />
                        <br />
                        Your 3 teams must be placed in the following categories:  5 points, 3 points and 1 point.
                        <br />
                        <br />
                        If your team wins, you will receive the points in the respective categories.
                        <br />
                        <br />
                        For example, let's say you select the IND (5), BAL (3) and GB (1).  If only the Colts and Packers win that week, you would receive 6 points (IND 5, GB 1).
                        <br />
                        <br />
                        If in any week of the season, your 3 choices result in 3 wins, you will be awarded 2 additional points.
                        <br />
                        <br />
                        Once you select a team in a point category, you cannot place them in that same point category for the remainder of the season.
                        <br />
                        <br />
                        For example, you can only select the Colts to win during 3 separate weeks of the season.  You can place them in the 5 point category once, 3 point once and 1 point once.  Once you select them 3 times, you can no longer select them during the season.
                        <br />
                        <br />
                        Additional Rules:
                        <br />
                        -If a game results in a tie, it's considered a loss in Grid Iron
                        <br />
                    </Typography>
                    <Stack spacing={1} direction='row-reverse'>
                        <Button variant='outlined' color={'primary'} onClick={handleClose} sx={{ width: 80 }}>Close</Button>
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
}

export default ModalRules;