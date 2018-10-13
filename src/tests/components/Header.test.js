import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {} }/>)
    expect(wrapper).toMatchSnapshot();
})

test('should call start logout on button click', () => {
    const onLogoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={onLogoutSpy}/>)
    wrapper.find('#logout').simulate('click')
    expect(onLogoutSpy).toHaveBeenCalled();
})
