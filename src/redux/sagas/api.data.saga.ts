import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchData(action: any) {
    let gameData: any = [];

    for (let i = 1; i <= 18; i++ ) {
        yield axios.get('/api/data/update/' + i ).then((response: any) => {
            response.data.events.map((e: any) => gameData.push(e));
        }).catch((error: Error) => {
            console.log('error GETing API data:', error);
        });
    };

    console.log('gameData from saga: ', gameData);

};

function* apiData() {
    yield takeLatest('FETCH_API_DATA', fetchData);
}

export default apiData;