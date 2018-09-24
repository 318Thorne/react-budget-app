import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

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
    const expense = {
        description: 'Rent',
        amount: 12300,
        createdAt: 1200,
        note: 'note'
    }
    const action = addExpense(expense);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expense,
            id: expect.any(String)
        }
    })
})

test('should set up add expense with defualt values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            amount: 0,
            createdAt: 0,
            note: '',
            id: expect.any(String)
        }
    })
})