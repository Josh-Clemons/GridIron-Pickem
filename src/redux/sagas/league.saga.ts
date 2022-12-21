import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createLeague(action: any) {
    try {
        // creates league
        yield axios.post('/api/league/create', action.payload)

        // gets the newest league created by the user and sets to redux
        const newLeague: any = yield axios.get('/api/league/newest');
        yield put({ type: 'SET_NEW_LEAGUE', payload: newLeague.data });

        // joins commissioner to league when they create it
        yield axios.post('/api/pick/create/' + newLeague.data[0].id, newLeague.data[0].id);

        // fetches leagues
        yield put({ type: 'FETCH_LEAGUES' });
    } catch (error) {
        console.log('Error in createLeague Saga', error);
    };
}

function* fetchLeagues(action: any) {
    try {
        const leagues: any = yield axios.get('/api/league/');
        yield put({ type: 'SET_LEAGUES', payload: leagues.data })
    } catch (error) {
        console.log('error in fetchLeagues', error);
    };
};

function* fetchLeagueDetail(action: any) {
    try {
        // console.log('in fetch league detail, testing payload', action.payload);
        const leagueDetail: any = yield axios.get('/api/league/' + action.payload)
        yield put({ type: 'SET_LEAGUE_DETAIL', payload: leagueDetail })

    } catch (error) {
        console.log('error in fetch league details', error);
    };
};


function* leagueSaga() {
    yield takeLatest('CREATE_LEAGUE', createLeague);
    yield takeLatest('FETCH_LEAGUES', fetchLeagues);
    yield takeLatest('FETCH_LEAGUE_DETAIL', fetchLeagueDetail);
}

export default leagueSaga;
