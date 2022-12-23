import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { teams } from '../data/team.list';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { width } from '@mui/system';


const MyPicks = () => {
    // const [fiveChoices, setFiveChoices ] = useState(teams);
    // const [threeChoices, setThreeChoices ] = useState(teams);
    // const [oneChoices, setOneChoices ] = useState(teams);

    const store: any = useSelector(store => store)
    const userPicks = store.leagues.leagueDetail.filter(e => e.username === store.user.username)

    const customStyles = {
        // control represent the select component
        control: (provided) => ({
            ...provided,
            width: '100%'
        })
    };

    let currentPicks: { week: number, team: string, amount: number }[] = []



    const pickChange = (option, week, amount) => {
        console.log('in pickChange, option.value, week, amount: ', option.value, week, amount);
        
        let foundPick: any = currentPicks.filter((pick) => (pick.amount === amount && pick.week === week));
        
        currentPicks = currentPicks.filter(pick => pick !== foundPick[0]);
        currentPicks.push({week: week, team: option.value, amount: amount});
        console.log('currentPicks after update:', currentPicks)
    }




    // function used to build pick selector, it gets called for each weeks picks 
    const weeklyPicks = (week: number) => {
        const pickFive = userPicks.filter(e => (e.week === week && e.amount === 5));
        const pickThree = userPicks.filter(e => (e.week === week && e.amount === 3));
        const pickOne = userPicks.filter(e => (e.week === week && e.amount === 1));

        currentPicks.push({week: week, team: pickFive[0].team, amount: 5});
        currentPicks.push({week: week, team: pickThree[0].team, amount: 3});
        currentPicks.push({week: week, team: pickOne[0].team, amount: 1});

        return (
            <TableRow key={"fiveChoiceWeek" + week}>
                <TableCell sx={{ padding: '6px', width: '20%' }}>{week}</TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='fiveChoice'
                        defaultValue={pickFive[0].team ? { value: pickFive[0].team, label: pickFive[0].team } : ''}
                        isSearchable={true}
                        name={"fiveChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option)=>pickChange(option, week, 5)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='threeChoice'
                        defaultValue={pickThree[0].team ? { value: pickThree[0].team, label: pickThree[0].team } : ''}
                        isSearchable={true}
                        name={"threeChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option)=>pickChange(option, week, 3)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='oneChoice'
                        defaultValue={pickOne[0].team ? { value: pickOne[0].team, label: pickOne[0].team } : ''}
                        isSearchable={true}
                        name={"oneChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option)=>pickChange(option, week, 1)}
                    />
                </TableCell>
            </TableRow>
        )
    }

    const weeks = [
        weeklyPicks(1),
        weeklyPicks(2),
        weeklyPicks(3),
        weeklyPicks(4),
        weeklyPicks(5),
        weeklyPicks(6),
        // weeklyPicks(7),
        // weeklyPicks(8),
        // weeklyPicks(9),
        // weeklyPicks(10),
        // weeklyPicks(11),
        // weeklyPicks(12),
        // weeklyPicks(13),
        // weeklyPicks(14),
        // weeklyPicks(15),
        // weeklyPicks(16),
        // weeklyPicks(17),
        // weeklyPicks(18),
    ]


    return (
        <Box width={'90%'}>
            <TableContainer component={Paper} elevation={12} sx={{ mb: '30px', padding: '10px', pb: '80px' }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ padding: '6px', width: '50px' }}>Week</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>5 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>3 Pts</TableCell>
                            <TableCell sx={{ padding: '6px', width: '20%' }}>1 Pt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeks}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MyPicks;