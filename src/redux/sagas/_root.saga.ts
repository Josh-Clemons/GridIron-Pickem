import { all } from 'redux-saga/effects';
import leagueSaga from './league.saga';
import loginSaga from './login.saga';
import pickSaga from './pick.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

export default function* rootSaga() {
    yield all([
        leagueSaga(),
        loginSaga(),
        pickSaga(),
        registrationSaga(),
        userSaga(),
    ]);
};