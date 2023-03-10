import { combineReducers, AnyAction } from 'redux';

// the game data used to check if a user's picks are correct
const gameData = (state = [], action: AnyAction) => {
    switch(action.type) {
        case 'SET_GAME_DATA':
            return action.payload;
        default:
            return state;
    };
};

export default combineReducers({
    gameData,
});