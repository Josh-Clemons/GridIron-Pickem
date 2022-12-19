import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action: any) {
    console.log('in loginUser saga, action.payload:', action.payload)
    try {
        // clear any existing error on the login page
        yield put({ type: 'CLEAR_LOGIN_ERROR' });

        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        // send the action.payload as the body
        // the config includes credentials which
        // allow the server session to recognize the user
        yield axios.post('/api/user/login', action.payload, config);

        // after the user has logged in
        // get the user information from the server
        yield put({ type: 'FETCH_USER' });
    } catch (error) {
        // console.log('Error with user login:', error);
        yield put({ type: 'LOGIN_FAILED' });
        
        
    }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action:any) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        // the config includes credentials which
        // allow the server session to recognize the user
        // when the server recognizes the user session
        // it will end the session
        console.log('in logout SAGA')
        yield axios.post('/api/user/logout', config);

        // now that the session has ended on the server
        // remove the client-side user object to let
        // the client-side code know the user is logged out
        yield put({ type: 'UNSET_USER' });
    } catch (error) {
        console.log('Error with user logout:', error);
    }
}

function* loginSaga() {
    yield takeLatest('LOGIN', loginUser);
    yield takeLatest('LOGOUT', logoutUser);
}

export default loginSaga;
