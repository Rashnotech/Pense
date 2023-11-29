import redux from 'redux'
import {produce} from 'immer'
import pkg from 'redux-logger'

const initialState = {
    name: 'Vishwas',
    address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
    },
}

const { createLogger } = pkg
const logger = createLogger()
const STREET_UPDATE = 'STREET_UPDATE'

const street = (street) => {
    return {
        type: STREET_UPDATE,
        payload: street,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case STREET_UPDATE:
          //  return {
           //     ...state,
            //    address: {
            //        ...state.address,
            //        street: action.payload
            //    },
           // }
        return produce(state, (draft) => {
            draft.address.street = action.payload
        })
        default:
            return state
    }
}

const applyMiddleware = redux.applyMiddleware
const store = redux.legacy_createStore(reducer, applyMiddleware(logger))
console.log('Initial State', store.getState())
const unsubcribe = store.subscribe(() => console.log('Updated state', store.getState()))
store.dispatch(street('456 Main St'))
unsubcribe()
