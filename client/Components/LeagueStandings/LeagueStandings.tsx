import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';


const LeagueStandings = () => {
    const store: any = useSelector(store => store);
    const leagueUsers = store.leagues.currentLeagueUsers;
    const leagueDetail = store.leagues.leagueDetail;
    const gameData = store.gameData.gameData;
    const [leagueScore, setLeagueScore] = useState<any>([]);

    useEffect(() => {
        score();
    }, [leagueUsers]);

    const score = () => {
        let tempScore: { name: string, score: number }[] = [];
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
                    score += 2;
                };
            };
            tempScore.push({ name: user.username, score: score });
        });
        tempScore.sort((a, b) => {
            return b.score - a.score;
        });
        setLeagueScore([...tempScore]);
    };


    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "#1C2541",
        },
        '&:nth-of-type(even)': {
            backgroundColor: "#242f53",
        },
    }));

    return (
        <Box width={'80%'} mb={'80px'}>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell align='right'>Score</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leagueScore.map((user) => {
                            return (
                                <StyledTableRow key={user.name}>
                                    <TableCell><Typography variant='body1' noWrap={true} >{user.name}</Typography></TableCell><TableCell align='right'>{user.score}</TableCell>
                                </StyledTableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>



        </Box>
    );
};

export default LeagueStandings;