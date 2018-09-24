import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <ul>
            <li><NavLink to="/" activeClassName="isActive" exact={true}>Home</NavLink></li>
            <li><NavLink to="/create" activeClassName="isActive">Add</NavLink></li>
            <li><NavLink to="/help" activeClassName="isActive" >Help</NavLink></li>
        </ul>
    </header>
);
export default Header;