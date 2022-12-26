import React, { useEffect } from 'react';
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
    const leagueDetail = store.leagues.leagueDetail;
    const gameData = store.gameData.gameData;


    const score = () => {
        leagueUsers.map((user) => {
            let score: number = 0;
            let bonusCheck: { id: number, week: number, team: string, is_winner: boolean }[] = [];
            const userPicks = leagueDetail.filter((pick: any) => pick.username === user.username);
            userPicks.map((pick: any) => {
                const pickStatus = gameData.filter((obj: any) => obj.week === pick.week && obj.team === pick.team);
                if (pickStatus[0]?.is_winner) {
                    bonusCheck.push(pickStatus[0]);
                    score += pick.amount;
                };
            });
            for (let i = 1; i <= 18; i++) {
                if (bonusCheck?.filter((pick: any) => pick.week === i && pick.is_winner === true).length === 3) {
                    console.log('found bonus score, user week:', user, i);
                    score += 2;
                };
            };
            console.log('score for user(with bonus)', user.username, score);
        });
    };


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
                            return <TableRow key={user.username} onClick={score}>
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