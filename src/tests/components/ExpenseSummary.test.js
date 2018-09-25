import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';



test('should render ExpenseSummary component with 1 expense', () => {
    const result = shallow(<ExpenseSummary expensesCount={1} expensesTotal={1000}/>);
    expect(result).toMatchSnapshot();
})

test('should render ExpenseSummary component with expenses', () => {
    const total = expenses[0].amount + expenses[1].amount + expenses[2].amount;
    const result = shallow(<ExpenseSummary expensesCount={expenses} expensesTotal={total} />);
    expect(result).toMatchSnapshot();
})
