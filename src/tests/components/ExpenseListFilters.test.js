import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import {filters, filtersTwo} from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByAmount = {sortByAmount}
            sortByDate = {sortByDate}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
            />
    );
});

test('should render ExpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
})

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: filtersTwo
    })
    expect(wrapper).toMatchSnapshot();
})

// should handle text change
test('should handle text change', () => {
    const value = 'text'
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenCalledWith(value);
})

// should sort by date
test('should sort by date', ()=>{
    wrapper.setProps({
        filters: filtersTwo
    })
    const value = 'date'
    wrapper.find('select').at(0).simulate('change', {
        target: {value}
    })
    expect(sortByDate).toHaveBeenCalled();
})
// should sort by amount
test('should sort by amount', ()=>{
    const value = 'amount'
    wrapper.find('select').at(0).simulate('change', {
        target: {value}
    })
    expect(sortByAmount).toHaveBeenCalled();
})
// should handle date changes
test('should handle date changes', () => {
    const startDate = 1000;
    const endDate = 1000;
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
})
// should handle date focus changes
test('should handle date focus changes', () => {
    const calendarFocused = true;
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
})