import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const LeagueStandings = () => {
    const store: any = useSelector(store => store);
    const leagueUsers = store.leagues.currentLeagueUsers;



    return (
        <Box width={'80%'}>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align='right'>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leagueUsers.map((user) => {
                            return <TableRow key={user.username}>
                                <TableCell>{user.username}</TableCell><TableCell align='right'>0</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>



        </Box>
    )
}

export default LeagueStandings;