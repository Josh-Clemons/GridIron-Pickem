import { type } from "os"

// this interface needs to be removed/updated
export interface UserInterface {
    username: String,
    password: String,
}

export interface Store {
    LoginError: LoginError,
    gameData: gameResults[],
    leagues: {
        availableLeagues: AvailableLeagues[],
        currentLeagueUsers: LeagueUsers[],
        leagueDetail: LeagueDetail[],
        userLeagues: UserLeagues[]
    },
    user: User
}

export interface LoginError {
    loginMessage: String,
    registrationMessage: String
}

export interface gameResults {
    id: Number,
    week: Number,
    selection_team: String,
    is_winner: Boolean,
}

export interface AvailableLeagues {
    id: number,
    league_name: string,
    user_array: number[]
}

export interface LeagueUsers {
    id: number,
    username: string
}

export interface LeagueDetail {
    league_id: number,
    owner_id: number,
    username: string,
    league_name: string,
    team: string,
    week: number,
    amount: number
}

export interface UserLeagues {
    league_id: number,
    league_name: string
}

export interface User {
    id: number
    username: string,
}