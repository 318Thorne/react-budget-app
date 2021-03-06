import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, 
        editExpense, removeExpense, 
        setExpenses, startSetExpenses, 
        startRemoveExpense, startEditExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'testuid'

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => {
        done();
    });
});

test('remove expense action object', () => {
    const action = removeExpense({id: 'abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'abc'
    })
})

test('edit expense action object', () => {
    const action = editExpense('123', {note: 'new note'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
           note : 'new note'
        }
    })
})

test('should set up add expense', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    })
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({auth: {uid}});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'this one is better',
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData))
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should add expenses with defaults to database and store', (done) => {
    const store = createMockStore({auth: {uid}});
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense())
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})

test('should fetch expeneses from firebase', (done) => {
    const store = createMockStore({auth: {uid}})
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        })
        done();
    })
})

test('should remove expenses from firebase', (done) =>{
    const id = expenses[0].id
    const store = createMockStore({ auth: {uid} });
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value')
    })
    .then((snapshot) => {
        expect(snapshot.val()).toBeNull();
        done();
    })
})

test('should set expense in firebase', (done) => {
    const id = expenses[0].id;
    const updates = {
        description: 'something completely different',
        note: 'now something is here',
        amount: 6666
    }
    const store = createMockStore({auth: {uid}});
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val()).toEqual({
            ...updates,
            createdAt: expenses[0].createdAt
        });
        done();
    });
});