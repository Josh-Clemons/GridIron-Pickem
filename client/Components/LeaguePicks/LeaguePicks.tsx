import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { LeagueDetail, LeagueUsers, Store } from '../../../src/interfaces/interfaces';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select, { SingleValue } from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';



// returns a component that allows users to see picks by week for everyone in the league
const LeaguePicks = () => {

    const store: Store = useSelector(store => store) as Store;
    const leagueUsers: LeagueUsers[] = store.leagues.currentLeagueUsers;
    const leagueDetail: LeagueDetail[] = store.leagues.leagueDetail;
    const [weeklyPicks, setWeeklyPicks] = useState<{username: string, five: undefined | string, three: undefined | string, one: undefined | string}[]>([]);
    const dateLockStart: Date = new Date('2022-11-09T01:15:00.007Z');

    // style for the react-select week chooser
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100px',
            backgroundColor: '#F8F8F8',
        })
    };

    // options for the select dropdown
    const week: {value: number, label: number, isDisabled: boolean}[] = [
        { value: 1, label: 1, isDisabled: (dateLockStart.getTime() > new Date().getTime() ? true : false) },
        { value: 2, label: 2, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7) > new Date().getTime() ? true : false) },
        { value: 3, label: 3, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 2) > new Date().getTime() ? true : false) },
        { value: 4, label: 4, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 3) > new Date().getTime() ? true : false) },
        { value: 5, label: 5, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 4) > new Date().getTime() ? true : false) },
        { value: 6, label: 6, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 5) > new Date().getTime() ? true : false) },
        { value: 7, label: 7, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 6) > new Date().getTime() ? true : false) },
        { value: 8, label: 8, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 7) > new Date().getTime() ? true : false) },
        { value: 9, label: 9, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 8) > new Date().getTime() ? true : false) },
        { value: 10, label: 10, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 9) > new Date().getTime() ? true : false) },
        { value: 11, label: 11, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 10) > new Date().getTime() ? true : false) },
        { value: 12, label: 12, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 11) > new Date().getTime() ? true : false) },
        { value: 13, label: 13, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 12) > new Date().getTime() ? true : false) },
        { value: 14, label: 14, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 13) > new Date().getTime() ? true : false) },
        { value: 15, label: 15, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 14) > new Date().getTime() ? true : false) },
        { value: 16, label: 16, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 15) > new Date().getTime() ? true : false) },
        { value: 17, label: 17, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 16) > new Date().getTime() ? true : false) },
        { value: 18, label: 18, isDisabled: ((dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7 * 17) > new Date().getTime() ? true : false) }
    ];

    const weekChange = (choice: SingleValue<{value: number, label: number, isDisabled: boolean}> ) => {
        const tempPicks: {username: string, five: undefined | string, three: undefined | string, one: undefined | string}[] = [];
        // sorts users in alphabetical order for easier use
        const sortedUsers: LeagueUsers[] = leagueUsers.sort((a, b) => {
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

        // maps through each user and adds their picks for the current week to the array
        sortedUsers.map((user: LeagueUsers) => {
            const fivePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 5 && pick.week === choice?.value);
            const threePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 3 && pick.week === choice?.value);
            const onePick = leagueDetail.filter((pick) => pick.username === user.username && pick.amount === 1 && pick.week === choice?.value);
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
                <Typography variant='h6' sx={{ mr: 3 }}>Week: </Typography>
                <Select
                    className='week'
                    name={"week"}
                    options={week}
                    styles={customStyles}
                    onChange={(choice) => weekChange(choice)}
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: '#1C2541',
                            neutral0: '#1C2541',
                            neutral20: '#0B132B',
                            neutral40: 'black',
                            neutral50: 'black',
                        },
                    })}
                />
            </Box>
            <TableContainer component={Paper} elevation={12} sx={{ mb: '30px', padding: 1, marginTop: '20px', marginBottom: '80px', width: '90vw' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '6px', maxWidth: '25%' }}>User</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>5 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>3 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>1 Pt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeklyPicks.map((pick: {username: string, five: undefined | string, three: undefined | string, one: undefined | string}) => {
                            return (
                                <TableRow key={pick.username}>
                                    <TableCell sx={{ pl: 1, pr: 1 }}><Typography variant='body1' noWrap={true} sx={{ maxWidth: 140 }} >{pick.username}</Typography></TableCell>
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