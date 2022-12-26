import { combineReducers } from 'redux';

const gameData = (state = [], action: any) => {
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