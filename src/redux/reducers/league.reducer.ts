import { combineReducers } from 'redux';


const userLeagues = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_LEAGUES':
            return action.payload;
        case 'CLEAR_LEAGUES':
            return [];
        default:
            return state;
    }
};

const newLeague = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_NEW_LEAGUE':
            return action.payload;
        default:
            return state;
    };
};

const leagueDetail = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_LEAGUE_DETAIL':
            return action.payload.data;
        default:
            return state;
    };
};

export default combineReducers({
    userLeagues,
    newLeague,
    leagueDetail
});