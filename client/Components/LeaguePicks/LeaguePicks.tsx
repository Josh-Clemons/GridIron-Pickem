import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';



const LeaguePicks = () => {

    const store: any = useSelector(store => store)
    const leagueUsers = store.leagues.currentLeagueUsers;
    const leagueDetail = store.leagues.leagueDetail;
    const [weeklyPicks, setWeeklyPicks] = useState<any>([]);

    useEffect(() => {
        weekChange(1);
    }, []);

    const customStyles = {
        // control represent the select component
        control: (provided) => ({
            ...provided,
            width: '100px',
        })
    };

    const week: any[] = [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
        { value: 5, label: 5 },
        { value: 6, label: 6 },
        { value: 7, label: 7 },
        { value: 8, label: 8 },
        { value: 9, label: 9 },
        { value: 10, label: 10 },
        { value: 11, label: 11 },
        { value: 12, label: 12 },
        { value: 13, label: 13 },
        { value: 14, label: 14 },
        { value: 15, label: 15 },
        { value: 16, label: 16 },
        { value: 17, label: 17 },
        { value: 18, label: 18 }
    ];

    const weekChange = (option) => {
        const tempPicks: any = [];
        // sorts users in alphabetical order for easier use
        const sortedUsers = leagueUsers.sort((a, b) => {
            let fa = a.username.toLowerCase();
            let fb = b.username.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });

        sortedUsers.map((user) => {
            const fivePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 5 && pick.week === option.value);
            const threePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 3 && pick.week === option.value);
            const onePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 1 && pick.week === option.value);
            tempPicks.push({ username: user.username, five: fivePick[0]?.team, three: threePick[0]?.team, one: onePick[0]?.team })
        })
        setWeeklyPicks([...tempPicks]);
    };

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}
            >
                <Typography variant='h6' sx={{ mr: '10px' }}>Week: </Typography>
                <Select
                    className='week'
                    name={"week"}
                    options={week}
                    styles={customStyles}
                    onChange={(option) => weekChange(option)}
                />
            </Box>
            <TableContainer component={Paper} elevation={12} sx={{ mb: '30px', padding: '10px', marginTop: '20px', marginBottom: '80px', width: '80vw' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '6px', width: '25%' }}>User</TableCell>
                            <TableCell sx={{ padding: '6px', width: '25%' }}>5 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '25%' }}>3 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '25%' }}>1 Pt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeklyPicks.map((pick) => {
                            return (
                                <TableRow key={pick.username}>
                                    <TableCell>{pick.username}</TableCell>
                                    <TableCell>{pick.five}</TableCell>
                                    <TableCell>{pick.three}</TableCell>
                                    <TableCell>{pick.one}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default LeaguePicks;