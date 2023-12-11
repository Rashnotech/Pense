import redux from 'redux'

const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILED = 'FETCH_USER_FAILED'
const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'

const initialState = {
    loading: false,
    data: [],
    error: ''
}

const fetchUserRequest = (users) => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users,
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILED,
        payload: error,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        
        case FETCH_USER_FAILED:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
    
        default:
            return state
    }
}

const store = redux.legacy_createStore(reducer)

store.dispatch( )