import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';



const Footer = () => {

    function Copyright(props: any) {
        return (
            <Box sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                borderTop: 1,
                borderColor: "text.secondary",
                bgcolor: "#aae0f1"
            }}>
                <Typography variant="body2" color="text.secondary" align="center" {...props} sx={{ marginTop: 10 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/Josh-Clemons/GridIron-Pickem">
                        Josh Clemons
                    </Link>{' '}
                    2022
                    {'.'}
                    <br />
                    <Link color="inherit" href="#/about">
                        About
                    </Link>{' '}
                </Typography>
                <br />

            </Box>
        );
    }



    return (
        <Copyright />
    )
}

export default Footer