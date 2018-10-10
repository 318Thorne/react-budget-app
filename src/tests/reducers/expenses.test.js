import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense from state', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
})

test('should not remove expense from state if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses) ;
})

// should add an expense
test('should add expense object to state', () => {
    const expense = {
        description: 'new',
        note: '',
        amount: 200,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
})

// should edit an expense
test('should edit an expense', () => {
    const updates = {
        ...expenses[0],
        description: 'changed'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([updates, expenses[1], expenses[2]]);
})

// should not edit an expense if id wrong

test('should not edit an expense', () => {
    const updates = {
        ...expenses[0],
        description: 'changed'
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: expenses[1]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses[1]);
});
