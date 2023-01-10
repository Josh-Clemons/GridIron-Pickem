import axios from "axios";
import { takeLatest } from "redux-saga/effects";

function* sendInvite(action: any) {
    console.log('in sendInvite Saga')
    try {
        yield axios.post('/api/email', action.payload);
    } catch {
        console.log('error in sendInvite Saga')
    }
}

function* emailSaga() {
    yield takeLatest('SEND_INVITE', sendInvite);
}
export default emailSaga;