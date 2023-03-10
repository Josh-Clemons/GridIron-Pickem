import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
import { GameResults, Store, Pick } from '../../../src/interfaces/interfaces';
import { pickCheckDuplicate, pickCheckWeek, pickCheckGame } from '../PickCheck/PickCheck';


const Picks: React.FC = () => {

    const dispatch = useDispatch();
    const store: Store = useSelector(store => store) as Store;
    const leagueId: number = store.leagues.leagueDetail[0]?.league_id;
    const userPicks: Pick[] = store.leagues.leagueDetail.filter(e => e.username === store.user.username);
    const gameData: GameResults[] = store.gameData.gameData;

    let currentPicks: Pick[] = [];
    let dateLockStart: Date = new Date('2022-09-16T01:15:00.007Z');

    // THIS FUNCTION IS USED FOR PRESENTATION PURPOSES ONLY
    const presentationTrigger = () => {
        dispatch({ type: 'SET_API_DATA' });
        dateLockStart = new Date('2022-09-02T01:15:00.007Z')
    }


    const customStyles = {
        control: (provided: any, { isDisabled }: { isDisabled: boolean }) => ({ // passes isDisabled so a different BG color can be applied
            ...provided,
            width: '100%',
            backgroundColor: isDisabled ? '#9AA4AE' : '#F8F8F8',
            menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) // this is used to keep the menu portal above all other page elements (so the list doesn't get cut off)
        })
    };

    // when a pick is changed the function is called and passed props that are used to first filter out the old pick,
    // then push the new pick value in
    const pickChange = (option: any, week: number, amount: number) => {
        let foundPick: Pick[] = currentPicks.filter((pick) => (pick.amount === amount && pick.week === week));
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
        const dupeWeek: boolean = pickCheckWeek(currentPicks);
        const dupeAmount: boolean = pickCheckDuplicate(currentPicks);
        const dupeGame: boolean = pickCheckGame(currentPicks, gameData)
        if (!dupeWeek && !dupeAmount && !dupeGame) {
            dispatch({ type: 'UPDATE_PICKS', payload: { picks: currentPicks, leagueId: leagueId, userId: store.user.id } });
            alertSavePicks();
            dispatch({ type: 'SET_API_DATA' });
            dateLockStart = new Date('2022-09-02T01:15:00.007Z')
        } else if (dupeAmount) {
            alertPickError('Duplicates in Amount Column');
        } else if (dupeWeek) {
            alertPickError('Duplicates in Same Week');
        } else if (dupeGame) {
            alertPickError('Duplicates picked from same game')
        };
    };



    // function used to build pick selector, it gets called for each weeks picks 
    const weeklyPicks = (week: number) => {
        // grabs the pick for each week and value, so it can be used as the default value for react-select
        const pickFive: any = userPicks.filter(e => (e.week === week && e.amount === 5));
        const pickThree: Pick[] = userPicks.filter(e => (e.week === week && e.amount === 3));
        const pickOne: Pick[] = userPicks.filter(e => (e.week === week && e.amount === 1));
        // pushes the pick into an array that is used for when changes are made. Current picks are held in this component then 
        // sent to the DB when saved
        currentPicks.push({ week: week, team: pickFive[0].team, amount: 5 });
        currentPicks.push({ week: week, team: pickThree[0].team, amount: 3 });
        currentPicks.push({ week: week, team: pickOne[0].team, amount: 1 });

        // checks the pick against the game data to get the start time, then uses that in the isDisabled prop for 
        // react-select. If pick is after start time then user can't change their choice.
        const fiveLockDetails: any = gameData.filter(e => e.week === pickFive[0].week && e.team === pickFive[0].team)
        const fiveLockTime: Date = new Date(fiveLockDetails[0]?.start_time);
        const threeLockDetails: any = gameData.filter(e => e.week === pickThree[0].week && e.team === pickThree[0].team)
        const threeLockTime: Date = new Date(threeLockDetails[0]?.start_time);
        const oneLockDetails: any = gameData.filter(e => e.week === pickOne[0].week && e.team === pickOne[0].team)
        const oneLockTime: Date = new Date(oneLockDetails[0]?.start_time);

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
                        isDisabled={(dateLockStart < new Date() || fiveLockTime < new Date()) ? true : false}
                        isSearchable={true}
                        name={"fiveChoiceWeek" + week}
                        options={teamOptions(week)}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#1C2541',
                                primary25: '#1C2541',
                                neutral0: '#1C2541',
                                neutral20: '#0B132B',
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
                        isDisabled={(dateLockStart < new Date() || threeLockTime < new Date()) ? true : false}
                        name={"threeChoiceWeek" + week}
                        options={teamOptions(week)}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#1C2541',
                                primary25: '#1C2541', // -- the first value gets highlighted, this is that color
                                neutral0: '#1C2541',
                                // neutral10: 'red', -- this is the border color for disabled
                                neutral20: '#0B132B', //-- this is the border color for not disabled and the color of disabled options
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
                        isDisabled={(dateLockStart < new Date() || oneLockTime < new Date()) ? true : false}
                        name={"oneChoiceWeek" + week}
                        options={teamOptions(week)}
                        styles={customStyles}
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#1C2541',
                                primary25: '#1C2541',
                                neutral0: '#1C2541',
                                neutral20: '#0B132B',
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

    // builds the options for the react-selectors, it disables teams that have already played that week
    const teamOptions = (week: number) => {
        let pickOptions: any[] = [
            { value: '', label: 'Select...', isDisabled: false },
        ];
        const currentWeekData: GameResults[] = gameData.filter(e => e.week === week)

        let choiceCount: number = 0;
        currentWeekData.map((game) => {
            const isDisabled: boolean = (new Date(game.start_time) < new Date() ? true : false)

            if (isDisabled) {
                return;
            } else {
                pickOptions.push({ value: game.team, label: game.team })
            };
        })

        // sorts options alphabetically
        pickOptions = pickOptions.sort((a, b) => {
            let fa = a.value;
            let fb = b.value;

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        })
        return pickOptions;
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
        <Box component={Paper} elevation={2} width={'100%'} mb={15} sx={{ display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
            {/* <RefreshApiData /> */}
            <Button variant='outlined' size='large' color='success' onClick={savePicks} sx={{ mt: 2, mb: 2, borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}>Save Picks<DoneAllIcon sx={{ ml: 2 }} /></Button>
            <TableContainer sx={{ mb: 2, pb: 40 }}>
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
            <Button variant='outlined' size='large' color='success' onClick={savePicks} sx={{ mb: 35, mt: -35, borderWidth: '2px', '&:hover': { borderWidth: '2px' } }}>Save Picks<DoneAllIcon sx={{ ml: 2 }} /></Button>
        </Box>
    )
}

export default Picks;