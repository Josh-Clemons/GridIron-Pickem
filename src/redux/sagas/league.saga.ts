import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* createLeague(action: any) {
    try {
        // creates league
        yield axios.post('/api/league/create', action.payload)
        console.log('in create league post')
        // gets the newest league created by the user and sets to redux
        const newLeague: any = yield axios.get('/api/league/newest');
        console.log('in create league post, after new league get, newLeague.data:', newLeague.data);
        yield put({ type: 'SET_NEW_LEAGUE', payload: newLeague.data });

        // joins commissioner to league when they create it
        yield axios.post('/api/pick/create/' + newLeague.data[0].id, newLeague.data[0].id);

        // fetches leagues
        yield put({ type: 'FETCH_LEAGUES' });
    } catch (error) {
        console.log('Error in createLeague Saga', error);
    };
};

function* fetchLeagues(action: any) {
    try {
        const leagues: any = yield axios.get('/api/league/');
        yield put({ type: 'SET_LEAGUES', payload: leagues.data })
    } catch (error) {
        console.log('error in fetchLeagues', error);
    };
};

// gets leagues that are available for a user to join from DB/router
function* fetchAvailableLeagues(action: any) {
    try {
        const availableLeagues: any = yield axios.get('/api/league/available');
        yield put({ type: 'SET_AVAILABLE_LEAGUES', payload: availableLeagues.data})

    } catch (error) {
        console.log('error in fetch available leagues', error)
    };
}

function* fetchLeagueDetail(action: any) {
    try {
        // console.log('in fetch league detail, testing payload', action.payload);
        const leagueDetail: any = yield axios.get('/api/league/detail/' + action.payload);

        // build user list for league
        const leagueUsers: any = yield axios.get('/api/league/users/' + action.payload);

        yield put({ type: 'SET_LEAGUE_DETAIL', payload: leagueDetail });
        yield put({ type: 'SET_LEAGUE_USERS', payload: leagueUsers.data });
    } catch (error) {
        console.log('error in fetch league details', error);
    };
};

function* deleteLeague(action: any) {
    try {
        yield axios.delete('/api/league/delete/' + action.payload);
        yield put({ type: 'FETCH_LEAGUES' });
    }catch(error) {
        console.log('error in deleteLeague Saga: ', error)
    }
}

function* leaveLeague(action: any) {
    try {
        yield axios.delete('/api/league/leave/' + action.payload);
    }catch(error) {
        console.log('error in leaveLeague Saga:', error);
    }
}

function* leagueSaga() {
    yield takeLatest('CREATE_LEAGUE', createLeague);
    yield takeLatest('FETCH_LEAGUES', fetchLeagues);
    yield takeLatest('FETCH_AVAILABLE_LEAGUES', fetchAvailableLeagues);
    yield takeLatest('FETCH_LEAGUE_DETAIL', fetchLeagueDetail);
    yield takeLatest('DELETE_LEAGUE', deleteLeague);
    yield takeLatest('LEAVE_LEAGUE', leaveLeague);
};

export default leagueSaga;
