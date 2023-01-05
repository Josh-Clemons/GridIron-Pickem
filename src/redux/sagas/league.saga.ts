import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createLeague(action: any) : Generator<any, any, any> {

    try {
        // creates league, returns new league ID
        const newLeague: any = yield axios.post('/api/league/create', {leagueName: action.payload.leagueName, inviteCode: action.payload.inviteCode});
        // joins commissioner to league when they create it
        yield axios.post('/api/pick/create/' + newLeague.data.id, newLeague.data.id);

        // fetches leagues
        yield put({ type: 'FETCH_LEAGUES' });
    } catch (error) {
        console.log('Error in createLeague Saga', error);
    };
};

// grabs the current leagues the user has joined
function* fetchLeagues(): Generator<any, any, any> {
    try {
        const leagues: any = yield axios.get('/api/league/');
        yield put({ type: 'SET_LEAGUES', payload: leagues.data })
    } catch (error) {
        console.log('error in fetchLeagues', error);
    };
};

// gets leagues that are available for a user to join from DB/router
function* fetchAvailableLeagues(): Generator<any, any, any> {
    try {
        const availableLeagues: any = yield axios.get('/api/league/available');
        yield put({ type: 'SET_AVAILABLE_LEAGUES', payload: availableLeagues.data })

    } catch (error) {
        console.log('error in fetch available leagues', error)
    };
};

// fetches the pick details for the current league the user is viewing
function* fetchLeagueDetail(action: any): Generator<any, any, any> {
    try {
        const leagueDetail: any = yield axios.get('/api/league/detail/' + action.payload);

        // build user list for league
        const leagueUsers: any = yield axios.get('/api/league/users/' + action.payload);

        yield put({ type: 'SET_LEAGUE_DETAIL', payload: leagueDetail });
        yield put({ type: 'SET_LEAGUE_USERS', payload: leagueUsers.data });
    } catch (error) {
        console.log('error in fetch league details', error);
    };
};

// deletes league, then resets the list of leagues
function* deleteLeague(action: any) {
    try {
        yield axios.delete('/api/league/delete/' + action.payload);
        yield put({ type: 'FETCH_LEAGUES' });
    } catch (error) {
        console.log('error in deleteLeague Saga: ', error)
    };
};

function* leaveLeague(action: any) {
    try {
        yield axios.delete('/api/league/leave/' + action.payload);
    } catch (error) {
        console.log('error in leaveLeague Saga:', error);
    };
};

function* renameLeague(action: any) {
    try {
        yield axios.put('api/league/rename', action.payload);
        yield put({ type: 'FETCH_LEAGUE_DETAIL', payload: action.payload.id })
    } catch (error) {
        console.log('error in renameLeague:', error)
    };
};

function* fetchByCode(action: any): Generator<any, any, any> {
    try {
        const league: any = yield axios.put('api/league/invitecode', {code: action.payload});
        console.log('league.data:', league?.data[0]);
        window.location.assign('#/detail/'+league?.data[0].id);
    } catch (error) {
        console.log('error in fetchById saga:', error)
    }
}

function* leagueSaga() {
    yield takeLatest('CREATE_LEAGUE', createLeague);
    yield takeLatest('FETCH_LEAGUES', fetchLeagues);
    yield takeLatest('FETCH_AVAILABLE_LEAGUES', fetchAvailableLeagues);
    yield takeLatest('FETCH_LEAGUE_DETAIL', fetchLeagueDetail);
    yield takeLatest('DELETE_LEAGUE', deleteLeague);
    yield takeLatest('LEAVE_LEAGUE', leaveLeague);
    yield takeLatest('RENAME_LEAGUE', renameLeague);
    yield takeLatest('FETCH_BY_CODE', fetchByCode)
};

export default leagueSaga;
