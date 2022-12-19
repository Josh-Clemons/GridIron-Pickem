import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';


const rootReducer = combineReducers({
    errors,
    user,
});

export default rootReducer;