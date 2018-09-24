import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortby to amount',  () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
})

test('should set sortby to date',  () => {
    // const state = filtersReducer(undefined, { type: 'SORT_BY_DATE'});
    // expect(state.sortBy).toBe('amount');
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = {type: 'SORT_BY_AMOUNT'};
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('amount');
})

test('should set test filter', () => {
    const text = 'hello';
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text});
    expect(state.text).toBe(text);
})

test('should set startdate filter', () => {
    const date = moment(4);
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', date})
    expect(state.startDate).toEqual(date);
})

test('should set enddate filter', () => {
    const date = moment(5)
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', date})
    expect(state.endDate).toEqual(date);
})

