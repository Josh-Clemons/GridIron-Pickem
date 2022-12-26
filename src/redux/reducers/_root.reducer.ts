import { combineReducers } from 'redux';
import errors from './errors.reducer';
import gameData from './game.data.reducer'
import leagues from './league.reducer';
import user from './user.reducer';


const rootReducer = combineReducers({
    errors,
    user,
    leagues,
    gameData,
});

export default rootReducer;