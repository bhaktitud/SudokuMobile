import { 
    SET_BOARD, 
    SET_USER_RESULT,
    SET_VALIDATE_STATUS
} from '../actions'


const initialState = {
    board : [],
    userResult: [],
    status: 'unsolved'

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
        default:
            return state;
    }
}