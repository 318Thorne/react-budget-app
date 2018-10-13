import React from 'react';
import {shallow} from 'enzyme';
import {LoginPage} from '../../components/LoginPage';

test('should render login page correctly', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
})

test('should call start login on button click', () => {
    const onLoginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={onLoginSpy}/>)
    wrapper.find('button').simulate('click')
    expect(onLoginSpy).toHaveBeenCalled();
})