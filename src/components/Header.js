import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogout} from '../actions/auth';

export const Header = ({startLogout}) => (
    <header>
        <h1>Expensify</h1>
        <ul>
            <li><NavLink to="/" activeClassName="isActive" exact={true}>Home</NavLink></li>
            <li><NavLink to="/create" activeClassName="isActive">Add</NavLink></li>
            <li><NavLink to="/help" activeClassName="isActive" >Help</NavLink></li>
            <li><button id='logout' onClick={startLogout}>Log Out</button></li>
        </ul>
    </header>
);
const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})
export default connect(undefined, mapDispatchToProps)(Header);
