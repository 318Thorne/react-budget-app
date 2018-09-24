import {setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate} from '../../actions/filters';
import moment from 'moment';

test('generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    })
})

test('generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    })
})

test('generate text filter action object', () => {
    const action = setTextFilter('name');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'name'
    })
})

test('generate text filter action object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
})

test('generate sort by date filter action object', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
})

test('generate sort by amount filter action object', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
})