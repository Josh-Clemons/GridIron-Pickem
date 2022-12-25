import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData(action: any) {
    let gameData: any = [];

        // need to grab week, team, is_winner
    for (let i = 1; i <= 18; i++ ) {
        yield axios.get('/api/data/update/' + i ).then((response: any) => {
            response.data.events.map((e: any) => {
                const week = i;
                const homeTeam: string = e.competitions[0].competitors[0].team.abbreviation;
                const awayTeam: string = e.competitions[0].competitors[1].team.abbreviation;
                const homeWinner: boolean = (e.competitions[0].competitors[0].winner ? true : false );
                const awayWinner: boolean = (e.competitions[0].competitors[1].winner ? true : false );

                gameData.push({week: week, team: homeTeam, is_winner: homeWinner});
                gameData.push({week: week, team: awayTeam, is_winner: awayWinner});
            });
        }).catch((error: Error) => {
            console.log('error GETing API data:', error);
        });
    };

    yield put({ type: 'SAVE_GAME_DATA', payload: gameData})
};

function* saveData(action: any) {
    axios.post('/api/data/save', action.payload);
}

function* apiData() {
    yield takeLatest('FETCH_API_DATA', fetchData);
    yield takeLatest('SAVE_GAME_DATA', saveData)
}

export default apiData;