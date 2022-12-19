import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toolbar, IconButton, Typography } from '@mui/material';

import Box from '@mui/material/Box';
import DangerousIcon from '@mui/icons-material/Dangerous';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



export default function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const store: any = useSelector(store => store);

    const [state, setState] = React.useState({ left: false });

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/home');
    }

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }
            setState({ left: open });
        };

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/home')} >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                </ListItem>


                {store.user.id
                    ?
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/playground')} >
                            <ListItemIcon>
                                <DangerousIcon />
                            </ListItemIcon>
                            <ListItemText primary='Playground' />
                        </ListItemButton>
                    </ListItem>
                    :
                    <></>}

            </List>
            <Divider />
            {store.user.id ?
                <Button onClick={() => logout()}>
                    Logout
                </Button>
                :
                <>
                    <Button onClick={() => navigate('/login')}>
                        Login
                    </Button>
                    <Button onClick={() => navigate('/register')}>
                        Register
                    </Button>
                </>
            }

            {/* todo: Add login and register buttons here? */}
        </Box>
    );

    return (
        <div>

            <React.Fragment>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Grid Iron Pickem
                    </Typography>
                </Toolbar>
                {/* <Button onClick={toggleDrawer('left', true)}>Left</Button> */}
                <Drawer
                    anchor='left'
                    open={state['left']}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}