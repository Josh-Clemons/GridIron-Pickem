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
import { toast } from 'react-toastify';

import RefreshApiData from '../RefreshApiData/RefreshApiData';


const MyPicks = ({ isAdmin }) => {

    const dispatch = useDispatch();
    const store: any = useSelector(store => store);
    const leagueId = store.leagues.leagueDetail[0]?.league_id;
    const userPicks = store.leagues.leagueDetail.filter(e => e.username === store.user.username);
    let currentPicks: { week: number, team: string, amount: number }[] = [];
    let dateLockStart: any = new Date('2022-11-02T01:15:00.007Z');


    const customStyles: any = {
        control: (provided, { isDisabled }) => ({ // passes isDisabled so a different BG color can be applied
            ...provided,
            width: '100%',
            backgroundColor: isDisabled ? '#9AA4AE' : '#F8F8F8',
            menuPortal: base => ({ ...base, zIndex: 9999 }) // this is used to keep the menu portal above all other page elements (so the list doesn't get cut off)
        })
    };

    // function to make sure a team is not picked twice in the same week
    const pickCheckWeek = () => {
        for (let i = 0; i <= 17; i++) {
            const weeklyArray: any = currentPicks.filter((e) => e.week === i + 1)

            if ((weeklyArray[0].team === weeklyArray[1].team) && (weeklyArray[0].team !== null) || (weeklyArray[0].team === weeklyArray[2].team) && (weeklyArray[0].team !== null) || (weeklyArray[2].team === weeklyArray[1].team) && (weeklyArray[2].team !== null)) {
                return true;
            };
        };
        return false;
    };

    // checks to make sure a team is not used twice for the same amount of points (5, 3, or 1)
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


        // new Set builds a new object, with Set you can't have duplicate values. So if the object size is different than the 
        // array length, you know there are duplicate values in the array
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


    // when a pick is changed the function is called and passed props that are used to first filter out the old pick,
    // then push the new pick value in
    const pickChange = (option, week, amount) => {
        let foundPick: any = currentPicks.filter((pick) => (pick.amount === amount && pick.week === week));
        currentPicks = currentPicks.filter(pick => pick !== foundPick[0]);
        currentPicks.push({ week: week, team: option.value, amount: amount });
    };

    // alert that displays when picks are saved
    const alertSavePicks = () => {
        toast.success('Picks saved!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    // alert for when there is an error with pick entry
    const alertPickError = (errorText: string) => {
        toast.error(errorText, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    // savePicks first checks that the pick checks do not fail, if passed then a dispatch is triggered
    const savePicks = () => {
        const dupeWeek = pickCheckWeek();
        const dupeAmount = pickCheckDuplicate();
        if (!dupeWeek && !dupeAmount) {
            dispatch({ type: 'UPDATE_PICKS', payload: { picks: currentPicks, leagueId: leagueId } });
            alertSavePicks();
        } else if (dupeAmount) {
            alertPickError('Duplicates in Amount Column');
        } else {
            alertPickError('Duplicates in Same Week');
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

        // disable date increases by 7 days for each new set of inputs: (24 * 60 * 60 * 1000)ms = 1 day
        dateLockStart.setTime(dateLockStart.getTime() + (24 * 60 * 60 * 1000) * 7)

        return (
            <TableRow key={"fiveChoiceWeek" + week}>
                <TableCell sx={{ padding: '6px', width: 10 }}>{week}</TableCell>
                <TableCell sx={{ padding: '6px', width: '30%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='fiveChoice'
                        defaultValue={pickFive[0]?.team ? { value: pickFive[0].team, label: pickFive[0].team } : ''}
                        isDisabled={dateLockStart < new Date() ? true : false}
                        isSearchable={true}
                        name={"fiveChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#1C2541',
                                neutral0: '#1C2541',
                                neutral40: 'black',
                                neutral50: 'black',
                                neutral80: 'black',
                            },
                        })}
                        onChange={(option) => pickChange(option, week, 5)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '30%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='threeChoice'
                        defaultValue={pickThree[0]?.team ? { value: pickThree[0].team, label: pickThree[0].team } : ''}
                        isSearchable={true}
                        isDisabled={(dateLockStart < new Date() ? true : false)}
                        name={"threeChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#1C2541', // -- the first value gets highlighted, this is that color
                                neutral0: '#1C2541',
                                // neutral10: 'red', -- this is the border color for disabled
                                // neutral20: 'red', //-- this is the border color for not disabled
                                neutral40: 'black', // -- default value color for disabled fields
                                neutral50: 'black', // -- default value color for non-disabled fields
                                neutral80: 'black', // color of value after making selection
                            },
                        })}
                        onChange={(option) => pickChange(option, week, 3)}
                    />
                </TableCell>
                <TableCell sx={{ padding: '6px', width: '30%' }}>
                    <Select
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        className='oneChoice'
                        defaultValue={pickOne[0]?.team ? { value: pickOne[0].team, label: pickOne[0].team } : ''}
                        isSearchable={true}
                        isDisabled={(dateLockStart < new Date() ? true : false)}
                        name={"oneChoiceWeek" + week}
                        options={teams}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary25: '#1C2541',
                                neutral0: '#1C2541',
                                neutral40: 'black',
                                neutral50: 'black',
                                neutral80: 'black',
                            },
                        })}
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
        <Box component={Paper} elevation={12} width={'95%'} mb={15} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            <RefreshApiData />
            <Button variant='outlined' size='large' color='success' onClick={savePicks} sx={{ mt: 2, mb: 2 }}>Save Picks</Button>
            <TableContainer sx={{ mb: 2, pb: 20 }}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pr: 1, pl: 1, width: 10 }}>Week</TableCell>
                            <TableCell sx={{ padding: 1.5, width: '30%' }}>5 Pts</TableCell>
                            <TableCell sx={{ padding: 1.5, width: '30%' }}>3 Pts</TableCell>
                            <TableCell sx={{ padding: 1.5, width: '30%' }}>1 Pt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {weeks}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' size='large' color='success' onClick={savePicks} sx={{ mb: 20, mt: -20 }}>Save Picks</Button>
        </Box>
    )
}

export default MyPicks;