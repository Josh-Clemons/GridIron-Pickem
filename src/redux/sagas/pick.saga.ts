import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createPicks(action: any) {

    console.log('in createPicks saga, action.payload:', action.payload)

    try {
        // payload is leagueId
        yield axios.post('/api/pick/create/' + action.payload, action.payload);
        put({ type: 'FETCH_LEAGUES'});
    } catch (error) {
        console.log('Error in createPicks Saga', error);
    };
}

function* updatePicks(action: any) {
    try {
        yield axios.put('/api/pick/update/' + action.payload.leagueId, action.payload.picks)
    } catch (error) {
        console.log('error in updatePicks Saga', error)
    }
}




function* pickSaga() {
    yield takeLatest('CREATE_PICKS', createPicks);
    yield takeLatest('UPDATE_PICKS', updatePicks);
}

export default pickSaga;