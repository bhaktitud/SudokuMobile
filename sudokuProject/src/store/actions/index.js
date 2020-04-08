import axios from 'axios'

export const SET_BOARD = 'SET_BOARD';
export const SET_USER_RESULT = 'SET_USER_RESULT';
export const SET_VALIDATE_STATUS = 'SET_VALIDATE_STATUS';
export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_GAME_LEVEL = 'SET_GAME_LEVEL';
export const SET_LOADING = 'SET_LOADING';


export const fetchBoard = (level) => {
    return (dispatch) => {
        axios
            .get(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
            .then(({ data }) => {
                const { board } = data
                dispatch(setBoard(board))
                dispatch(setUserResult(board))
                dispatch(setLoading(false))
            }).catch((err) => {
                console.log(err)
            })
    }
}

export const setBoard = (board) => {
    return {
        type: SET_BOARD,
        payload: board
    }
}

export const setUserResult = (userResult) => {
    return {
        type: SET_USER_RESULT,
        payload: userResult
    }
}

export const validateResult = (board) => {
    return (dispatch) => {
        axios
            .post(`https://sugoku.herokuapp.com/validate`, board)
            .then(({ data }) => {
                console.log(data, 'validation')
                const { status } = data
                dispatch(setValidateStatus(status))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setValidateStatus = (status) => {
    return {
        type: SET_VALIDATE_STATUS,
        payload: status
    }
}

export const showResult = (board) => {
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

    const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

    return (dispatch) => {
        axios
            .post(`https://sugoku.herokuapp.com/solve`, encodeParams({board}))
            .then(({ data }) => {
                const { solution, status } = data
                dispatch(setBoard(solution))
                dispatch(setUserResult(solution))
                dispatch(setValidateStatus(status))
            }).catch((err) => {
                console.log(err)
            });
    }
}

export const setPlayername = (playerName) => {
    return {
        type: SET_PLAYER_NAME,
        payload: playerName
    }
}

export const setGameLevel = (level) => {
    return {
        type: SET_GAME_LEVEL,
        payload: level
    }
}

export const setLoading = (status) => {
    return {
        type: SET_LOADING,
        payload: status
    }
}