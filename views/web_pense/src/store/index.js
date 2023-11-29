import redux, { combineReducers } from 'redux'
const createStore = redux.legacy_createStore
const bindActionCreators = redux.bindActionCreators
const combineReducer = redux.combineReducers


const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTOCK = 'CAKE_RESTOCK'

const ICECREAM_ORDERED = 'ICECREAM_ORDERED'

const orderIce = (qty) => {
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restock = (qty = 1) => {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
}

const cakeState = {
    numofCake: 10
}

const creamState = {
    numofIce: 20
}

const cakeReducer = (state = cakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numofCake: state.numofCake - 1
            }
        case CAKE_RESTOCK:
            return {
                ...state,
                numofCake: state.numofCake + action.payload
            }
        default:
            return state;
    }    
}

const creamReducer = (state = creamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numofIce: state.numofIce - 4
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    cream: creamReducer
})

const store = createStore(rootReducer)
console.log('initialState', store.getState())

const unscribe = store.subscribe(() => console.log('updated state', store.getState()))

const action = bindActionCreators({orderCake, restock, orderIce}, store.dispatch)
action.orderCake()
action.orderCake()
action.orderCake()
action.restock(3)
action.orderIce(3)

unscribe()