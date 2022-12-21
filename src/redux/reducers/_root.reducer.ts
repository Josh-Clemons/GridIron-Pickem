import { combineReducers } from 'redux';
import errors from './errors.reducer';
import leagues from './league.reducer';
import user from './user.reducer';


const rootReducer = combineReducers({
    errors,
    user,
    leagues,
});

export default rootReducer;