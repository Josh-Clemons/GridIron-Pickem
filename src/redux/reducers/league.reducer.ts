import { combineReducers } from 'redux';

// the leagues the logged in user is currently in
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

// leagues available for the user to join
const availableLeagues = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_AVAILABLE_LEAGUES':
            return action.payload;
        default:
            return state;
    };
};

// sets the details for the current league a user is viewing
const leagueDetail = (state = [], action: any) => {
    switch (action.type) {
        case 'SET_LEAGUE_DETAIL':
            return action.payload.data;
        default:
            return state;
    };
};

// sets user list for current league the user is viewing
const currentLeagueUsers = (state = [], action: any ) => {
    switch(action.type) {
        case 'SET_LEAGUE_USERS':
            return action.payload;
        default:
            return state;
    };
};

export default combineReducers({
    userLeagues,
    availableLeagues,
    leagueDetail,
    currentLeagueUsers
});