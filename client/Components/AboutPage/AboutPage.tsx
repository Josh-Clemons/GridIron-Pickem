import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';


// TODO: update next steps and special thanks

const AboutPage = () => {
    return (
        <Box m={2}>
            <Typography variant='h5'>About:</Typography>
            <Typography variant='h6' sx={{ textDecoration: 'underline', pt: 2 }}>Technologies Used</Typography>
            <List dense={true} sx={{ listStyleType: 'disc', pl: 2, }}>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    TypeScript
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Material UI
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    React
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Redux
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Node.js
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Express
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    ...and many more!
                </ListItem>
            </List>
            <Typography variant='h6' sx={{ textDecoration: 'underline', pt: 2 }}>Challenges I Faced</Typography>
            <List dense={true} sx={{ listStyleType: 'disc', pl: 2, }}>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Controlling all of the inputs on the My Picks page
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Calculating the scores by checking them against the data API
                </ListItem>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Learning TypeScript
                </ListItem>
            </List>
            <Typography variant='h6' sx={{ textDecoration: 'underline', pt: 2 }}>Next Steps</Typography>
            <List dense={true} sx={{ listStyleType: 'disc', pl: 2, }}>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Update this at the end of the project
                </ListItem>
            </List>
            <Typography variant='h6' sx={{ textDecoration: 'underline', pt: 2 }}>Special Thanks</Typography>
            <List dense={true} sx={{ listStyleType: 'disc', pl: 2, }}>
                <ListItem sx={{ display: 'list-item', fontSize: 16 }}>
                    Update this at the end of the project
                </ListItem>
            </List>
        </Box>
    );
};

export default AboutPage;