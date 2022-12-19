import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';






const Footer = () => {

    function Copyright(props: any) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ marginTop: 100}}>
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/Josh-Clemons/GridIron-Pickem">
                    Josh Clemons
                </Link>{' '}
                2022
                {'.'}
            </Typography>
        );
    }



    return (
        <Copyright />
    )
}

export default Footer