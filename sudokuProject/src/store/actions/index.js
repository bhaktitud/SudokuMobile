import axios from 'axios'

export const SET_BOARD = 'SET_BOARD';


export const fetchBoard = (level) => {
    return (dispatch) => {
        axios
            .get(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(({ data }) => {
                const { board } = data
                dispatch(setBoard(board))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setBoard = (board) => {
    return {
        type: SET_BOARD,
        payload: board
    }
}