import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';



const Footer: React.FC = () => {

    function Copyright() {
        return (
            <Box sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                borderTop: 1,
                borderColor: "text.secondary",
                bgcolor: "#1C2541"
            }}>
                <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: "5px", mb: "5px"}}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/Josh-Clemons/GridIron-Pickem">
                        Josh Clemons
                    </Link>{' '}
                    2022
                    {'.'}
                </Typography>

            </Box>
        );
    }



    return (
        <Copyright />
    )
}

export default Footer