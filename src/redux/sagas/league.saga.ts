import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "league" actions
function* createLeague(action: any) {

    // try {

    // // passes the username and password from the payload to the server
    // yield axios.post('/api/user/register', action.payload);

    //     // automatically log a user in after registration
    //     yield put({ type: 'LOGIN', payload: action.payload });

    try {
        console.log('in createLeague Saga, action.payload: ', { name: action.payload });
        yield axios.post('/api/league/create', action.payload);

    } catch (error) {
        console.log('Error in createLeague Saga', error);
    };
}

function* leagueSaga() {
    yield takeLatest('CREATE_LEAGUE', createLeague);
}

export default leagueSaga;
