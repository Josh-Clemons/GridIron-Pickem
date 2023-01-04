import { Pick, GameResults } from '../../../src/interfaces/interfaces';


// checks to make sure a team is not used twice for the same amount of points (5, 3, or 1)
export const pickCheckDuplicate = (currentPicks: Pick[]) => {
    const fivePicks: Pick[] = currentPicks.filter((e) => e.amount === 5 && e.team !== null && e.team !== '');
    const threePicks: Pick[] = currentPicks.filter((e) => e.amount === 3 && e.team !== null && e.team !== '');
    const onePicks: Pick[] = currentPicks.filter((e) => e.amount === 1 && e.team !== null && e.team !== '');

    let checkFiveArray: string[] = [];
    let checkThreeArray: string[] = [];
    let checkOneArray: string[] = [];

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


// function to make sure a team is not picked twice in the same week
export const pickCheckWeek = (currentPicks: Pick[]) => {
    for (let i = 0; i <= 17; i++) {
        const weeklyArray: Pick[] = currentPicks.filter((e) => e.week === i + 1)

        if ((weeklyArray[0].team === weeklyArray[1].team) && (weeklyArray[0].team !== null) && (weeklyArray[0].team !== '') || (weeklyArray[0].team === weeklyArray[2].team) && (weeklyArray[0].team !== null) && (weeklyArray[0].team !== '') || (weeklyArray[2].team === weeklyArray[1].team) && (weeklyArray[2].team !== null) && (weeklyArray[2].team !== '')) {
            return true;
        };
    };
    return false;
};

// checks to ensure two teams are not picked from the same game
export const pickCheckGame = (currentPicks: Pick[], gameData: GameResults[]) => {
    for (let i = 0; i <= 17; i++) {
        const currentWeekFivePick: Pick[] = currentPicks.filter(e => e.week === i + 1 && e.amount === 5)
        const currentWeekFiveData: any = gameData.filter(e => e.week === i + 1 && currentWeekFivePick[0].team === e.team)
        const currentWeekThreePick: Pick[] = currentPicks.filter(e => e.week === i + 1 && e.amount === 3)
        const currentWeekThreeData: any = gameData.filter(e => e.week === i + 1 && currentWeekThreePick[0].team === e.team)
        const currentWeekOnePick: Pick[] = currentPicks.filter(e => e.week === i + 1 && e.amount === 1)
        const currentWeekOneData: any = gameData.filter(e => e.week === i + 1 && currentWeekOnePick[0].team === e.team)

        // checks game IDs so they are not duplicated, excludes null or '' values as the user is allowed to have multiple of them
        if (
            (currentWeekFiveData[0]?.game_id === currentWeekThreeData[0]?.game_id && currentWeekFiveData[0]?.game_id && currentWeekFiveData[0]?.game_id !== '')
            || (currentWeekFiveData[0]?.game_id === currentWeekOneData[0]?.game_id && currentWeekFiveData[0]?.game_id && currentWeekFiveData[0]?.game_id !== '')
            || (currentWeekThreeData[0]?.game_id === currentWeekOneData[0]?.game_id && currentWeekThreeData[0]?.game_id && currentWeekThreeData[0]?.game_id !== '')
        ) {
            return true;
        }
    }
    return false;
}