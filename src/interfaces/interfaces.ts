export interface UserInterface {
    username: String,
    password: String,
}

export interface Store {
    LoginError: LoginError,
    gameData: gameResults[]
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
    user_array: {
        user: number
    }[]
}


