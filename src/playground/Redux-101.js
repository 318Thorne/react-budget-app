import { createStore, bindActionCreators } from 'redux';

//action generators

const incrementCount = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const resetCount = () => ({
    type: 'RESET'
})

const setCount = ({count} = {}) => ({
    type: 'SET',
    count
})
/*Reducers
    1. reducers are pure functions 
    2. never change state or action */
const countReducer = (state = {count: 0}, action) => {
    switch  (action.type){
        case 'INCREMENT': 
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count : state.count + incrementBy
            };
        case 'DECREMENT': 
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1
            return {
                count : state.count - decrementBy
            };
        case 'RESET': 
            return {
                count : 0
            };
        case 'SET':
            return{
                count: action.count
            }
        default:
            return state;
    }
}

// create stroe
const store = createStore(countReducer);

// subscribe, runs when state changes
    // store.subscribe(() => {
    //     console.log(store.getState());
    // });
// -- subscribe returns a function you can call to unsubscribe

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
}) // function is assigned to unsubscribe

// actions
// increment the count

store.dispatch(incrementCount({incrementBy: 5}))

store.dispatch(decrementCount({decrementBy: 5}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 100}))
