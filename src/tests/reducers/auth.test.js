import authReducer from '../../reducers/auth'

test('should set state to uid', () => {
    const uid = 'hello'
    const action = {
        type: 'LOGIN',
        uid 
    }
    const state = authReducer(undefined, action);
    expect(state).toEqual({
        uid
    });
})

test('should set empty state', () => {
    const action = {
        type: 'LOGOUT',
    }
    const state = authReducer({uid: 'hello'}, action);
    expect(state).toEqual({
    });
})