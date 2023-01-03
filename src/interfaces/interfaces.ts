
export interface Store {
    LoginError: LoginError,
    gameData: {gameData: GameResults[]},
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

export interface GameResults {
    week: Number,
    team: String,
    is_winner: Boolean,
    game_id: string,
    start_time: Date
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

export interface Pick {
    team: string,
    week: number,
    amount: number
}