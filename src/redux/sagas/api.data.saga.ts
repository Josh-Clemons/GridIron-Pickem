import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ErrorRequestHandler } from 'express';
import { GameResults } from '../../interfaces/interfaces';

interface GameDataQuery {
    id: number,
    week: number,
    team: string,
    is_winner: boolean
}

// grabs the game results from the DB and saves it to Redux
function* getData(): Generator<any, any, GameDataQuery[]> {
    try {
        const gameData: any = yield axios.get('/api/data/getresults');
        yield put({ type: 'SET_GAME_DATA', payload: gameData.data })
    } catch (error: any) {
        console.log('error GETting game results from DB: ', error)
    };
};


// grabs the weekly results from the router for each game (have to grab it by week due to ESPN API)
// builds the results into an array then sends it to the DB
function* setData() {
    let gameData: GameResults[] = [];

    for (let i = 1; i <= 18; i++) {
        yield axios.get('/api/data/update/' + i).then((response: any) => {
            response.data.events.map((e: any) => {
                const week = i;
                const gameId: string = e.id;
                const startTime: Date = e.date;
                const homeTeam: string = e.competitions[0].competitors[0].team.abbreviation;
                const awayTeam: string = e.competitions[0].competitors[1].team.abbreviation;
                const homeWinner: boolean = (e.competitions[0].competitors[0].winner ? true : false);
                const awayWinner: boolean = (e.competitions[0].competitors[1].winner ? true : false);

                gameData.push({ week: week, team: homeTeam, is_winner: homeWinner, game_id: gameId, start_time: startTime });
                gameData.push({ week: week, team: awayTeam, is_winner: awayWinner, game_id: gameId, start_time: startTime });
            });
        }).catch((error: Error) => {
            console.log('error GETing API data:', error);
        });
    };

    yield axios.post('/api/data/save', gameData);
    console.log('game data updated');
};


function* apiData() {
    yield takeLatest('SET_API_DATA', setData);
    yield takeLatest('GET_API_DATA', getData);
}

export default apiData;