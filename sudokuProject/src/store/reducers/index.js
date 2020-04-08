import { 
    SET_BOARD, 
    SET_USER_RESULT,
    SET_VALIDATE_STATUS,
    SET_PLAYER_NAME,
    SET_GAME_LEVEL
} from '../actions'


const initialState = {
    board : [],
    userResult: [],
    status: 'unsolved',
    playerName: 'player',
    level: ''

}

export const reducers = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case SET_BOARD:
            return {
                ...state,
                board: payload
            }
        case SET_USER_RESULT:
            return {
                ...state,
                userResult: payload
            }
        case SET_VALIDATE_STATUS:
            return {
                ...state,
                status: payload
            }
        case SET_PLAYER_NAME:
            return {
                ...state,
                playerName: payload
            }
        case SET_GAME_LEVEL:
            return {
                ...state,
                level: payload
            }
        default:
            return state;
    }
}