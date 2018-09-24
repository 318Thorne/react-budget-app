import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';


const addExpense = (
    {
    note = '',
    description = '',
    amount = 0, 
    createdAt = 0 
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date
})

const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date
})

const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(expense => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id == action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else return expense;
            } )
        default:
            return state;
    }
}
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date
            }
        default:
            return state;
    }
}

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt > startDate ;
        const endDateMatch = typeof endDate !== 'number' || exoense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description:'rent', amount:400, createdAt: -2000 }));
const expenseTwo = store.dispatch(addExpense({ description:'coffee', amount:300, createdAt: -1000}));

// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500}))
store.dispatch(sortByDate());
store.dispatch(sortByAmount());
// store.dispatch(setTextFilter('rent'));

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(128));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: 'fapsjf',
        description: 'january rent',
        note: 'final payment',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // date or amount
        startDate: undefined,
        endDate: undefined
    }
}