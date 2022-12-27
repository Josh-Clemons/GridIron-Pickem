import React from 'react';
import { useSelector } from 'react-redux';
import { teams } from '../data/team.list';
import { useDispatch } from 'react-redux';

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


const MyPicks = () => {

    const dispatch = useDispatch();
    const store: any = useSelector(store => store);
    const leagueId = store.leagues.leagueDetail[0]?.league_id;
    const userPicks = store.leagues.leagueDetail.filter(e => e.username === store.user.username);
    let currentPicks: { week: number, team: string, amount: number }[] = [];
    let dateLockStart: any = new Date('2022-09-02T00:15:00.007Z');


    const customStyles = {
        // control represent the select component
        control: (provided) => ({
            ...provided,
            width: '100%',
            menuPortal: base => ({ ...base, zIndex: 9999 })
        })
    };

    const pickCheckWeek = () => {
        for (let i = 0; i <= 17; i++) {
            const weeklyArray: any = currentPicks.filter((e) => e.week === i + 1)

            if ((weeklyArray[0].team === weeklyArray[1].team) && (weeklyArray[0].team !== null) || (weeklyArray[0].team === weeklyArray[2].team) && (weeklyArray[0].team !== null) || (weeklyArray[2].team === weeklyArray[1].team) && (weeklyArray[2].team !== null)) {
                return true;
            };
        };
        return false;
    };

    const pickCheckDuplicate = () => {
        const fivePicks: any = currentPicks.filter((e) => e.amount === 5 && e.team !== null && e.team !== '');
        const threePicks: any = currentPicks.filter((e) => e.amount === 3 && e.team !== null && e.team !== '');
        const onePicks: any = currentPicks.filter((e) => e.amount === 1 && e.team !== null && e.team !== '');

        let checkFiveArray: any = [];
        let checkThreeArray: any = [];
        let checkOneArray: any = [];

        for (let i = 0; i < fivePicks.length; i++) {
            checkFiveArray.push(fivePicks[i]?.team);
        };
        for (let i = 0; i < threePicks.length; i++) {
            checkThreeArray.push(threePicks[i]?.team);
        };
        for (let i = 0; i < onePicks.length; i++) {
            checkOneArray.push(onePicks[i]?.team);
        };

        if ((new Set(checkFiveArray).size !== checkFiveArray.length)) {
            return true;
        };
        if ((new Set(checkThreeArray).size !== checkThreeArray.length)) {
            return true;
        };
        if ((new Set(checkOneArray).size !== checkOneArray.length)) {
            return true;
        };
        return false;
    };


    const pickChange = (option, week, amount) => {
        let foundPick: any = currentPicks.filter((pick) => (pick.amount === amount && pick.week === week));
        currentPicks = currentPicks.filter(pick => pick !== foundPick[0]);
        currentPicks.push({ week: week, team: option.value, amount: amount });
    };

    const savePicks = () => {
        const dupeWeek = pickCheckWeek();
        const dupeAmount = pickCheckDuplicate();
        if (!dupeWeek && !dupeAmount) {
            dispatch({ type: 'UPDATE_PICKS', payload: { picks: currentPicks, leagueId: leagueId } });
            alert('picks saved');
            dispatch({ type: 'FETCH_LEAGUE_DETAIL', payload: leagueId });
        } else if (dupeAmount) {
            alert('duplicates with the same value');
        } else {
            alert('duplicates found in same week');
        };
    };



    // function used to build pick selector, it gets called for each weeks picks 
    const weeklyPicks = (week: number) => {
        const pickFive = userPicks.filter(e => (e.week === week && e.amount === 5));
        const pickThree = userPicks.filter(e => (e.week === week && e.amount === 3));
        const pickOne = userPicks.filter(e => (e.week === week && e.amount === 1));
        currentPicks.push({ week: week, team: pickFive[0].team, amount: 5 });
        currentPicks.push({ week: week, team: pickThree[0].team, amount: 3 });
        currentPicks.push({ week: week, team: pickOne[0].team, amount: 1 });

        dateLockStart.setTime(dateLockStart.getTime() + (24*60*60*1000) * 7)

        return (
            <TableRow key={"fiveChoiceWeek" + week}>
                <TableCell sx={{ padding: '6px', width: '50px' }}>{week}</TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='fiveChoice'
                        defaultValue={pickFive[0].team ? { value: pickFive[0].team, label: pickFive[0].team } : ''}
                        isDisabled={(dateLockStart< new Date() ? true : false )}
                        isSearchable={true}
                        name={"fiveChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option) => pickChange(option, week, 5)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='threeChoice'
                        defaultValue={pickThree[0].team ? { value: pickThree[0].team, label: pickThree[0].team } : ''}
                        isSearchable={true}
                        isDisabled={(dateLockStart< new Date() ? true : false )}
                        name={"threeChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option) => pickChange(option, week, 3)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '20%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='oneChoice'
                        defaultValue={pickOne[0].team ? { value: pickOne[0].team, label: pickOne[0].team } : ''}
                        isSearchable={true}
                        isDisabled={(dateLockStart< new Date() ? true : false )}
                        name={"oneChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        onChange={(option) => pickChange(option, week, 1)}
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
        weeklyPicks(7),
        weeklyPicks(8),
        weeklyPicks(9),
        weeklyPicks(10),
        weeklyPicks(11),
        weeklyPicks(12),
        weeklyPicks(13),
        weeklyPicks(14),
        weeklyPicks(15),
        weeklyPicks(16),
        weeklyPicks(17),
        weeklyPicks(18),
    ]


    return (
        <Box width={'90%'} mb={'80px'} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <Button variant='contained' color='success' onClick={savePicks} sx={{ mb: '10px' }}>Save Picks</Button>
            <TableContainer component={Paper} elevation={12} sx={{ mb: '30px', padding: '10px' }}>
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