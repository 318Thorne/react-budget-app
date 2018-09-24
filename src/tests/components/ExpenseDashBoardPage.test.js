import React from 'react';
import { shallow } from 'enzyme';
import ExpensesDashBoardPage from '../../components/ExpenseDashBoardPage';

test('should render not found page', () => {
    const wrapper = shallow(<ExpensesDashBoardPage />);
    expect(wrapper).toMatchSnapshot();
})