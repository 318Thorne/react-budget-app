import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const  {
                note = '',
                description = '',
                amount = 0, 
                createdAt = 0 
            } = expenseData
        const expense = {note, description, amount, createdAt};

        return database.ref('expenses').push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        })
    }
}

export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

export const startRemoveExpense = ({id} = {}) =>{
    return (dispatch) => {
        return database.ref(`expenses/${id}`)
        .remove()
        .then(() => dispatch(removeExpense({id})))
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return (dispatch) => {
        return database.ref(`expenses/${id}`)
        .update({
            ...updates
        })
        .then(() => dispatch(editExpense(id,updates)));
    }
}

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});


// fetch all expense data once
// parse that data into array
// dispatch set expenses
export const startSetExpenses = () => {
    return (dispatch) => {
       return database.ref('expenses')
        .once('value')
        .then((snapshot) => {
            const expenses = [];
            snapshot.forEach((snap) => {
                expenses.push(
                    {
                        id: snap.key,
                        ...snap.val()
                    }
                )
            })
            dispatch(setExpenses(expenses));
        });
    }
}