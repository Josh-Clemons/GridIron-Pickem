import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// this creates a users picks in a league when they first join
function* createPicks(action: any) {
    try {
        // payload is leagueId
        yield axios.post('/api/pick/create/' + action.payload, action.payload);
        put({ type: 'FETCH_LEAGUES'});
    } catch (error) {
        console.log('Error in createPicks Saga', error);
    };
}

// this is used to "update" picks, the old picks are first deleted, then new ones created
function* updatePicks(action: any) {
    try {
        yield axios.put('/api/pick/update/' + action.payload.leagueId, action.payload.picks);
        yield put({ type: 'FETCH_LEAGUE_DETAIL', payload: action.payload.leagueId });
    } catch (error) {
        console.log('error in updatePicks Saga', error)
    }
}




function* pickSaga() {
    yield takeLatest('CREATE_PICKS', createPicks);
    yield takeLatest('UPDATE_PICKS', updatePicks);
}

export default pickSaga;