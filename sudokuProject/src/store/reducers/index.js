import { SET_BOARD } from '../actions'


const initialState = {
    board : []
}

export const reducers = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case SET_BOARD:
            return {
                ...state,
                board: payload
            }
        default:
            return state;
    }
}