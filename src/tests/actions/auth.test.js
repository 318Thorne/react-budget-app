import {login,logout} from '../../actions/auth';

test('should return login action', () => {
    const uid = 'hello';
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
})

test('should return log out action', () => {
    const action = logout();
    expect(action).toEqual({type:'LOGOUT'});
})