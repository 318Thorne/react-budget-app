import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let wrapper, onSubmit, onClick, history;

beforeEach(() => {
    history = { push: jest.fn() };
    onSubmit = jest.fn();
    onClick = jest.fn();
    wrapper = shallow(<EditExpensePage expense={expenses[1]} onSubmit={onSubmit} onClick={onClick} history={history}/>);
})

test('should render edit expense page correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should call onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    expect(history.push).toHaveBeenCalledWith('/');
    expect(onSubmit).toHaveBeenCalledWith(expenses[1].id,expenses[1]);
})

test('should call onClick', () => {
    wrapper.find('button').prop('onClick')(expenses[1]);
    expect(history.push).toHaveBeenCalledWith('/');
    expect(onClick).toHaveBeenCalledWith(expenses[1].id);
})