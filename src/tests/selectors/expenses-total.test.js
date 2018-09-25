import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 for no expenses',() => {
    const result = expensesTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up a single expenses', () => {
    const result = expensesTotal([expenses[0]]);
    expect(result).toBe(expenses[0].amount);
})

test('should return sum of multiple expenses correctly', () => {
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    const result = expensesTotal(expenses);
    expect(result).toBe(total);
})