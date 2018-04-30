import React, { Component } from 'react';
import Dropdown from './dropdown';
import CountInfo from './count-info';
import Search from '../form/search';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <CountInfo />
          </div>
          <div className="navbar-center">
            <h1 className="logo">MyColl</h1>
          </div>
          <div className="navbar-right">
            <Search />
            <Dropdown>
              <li><a href="./#">Admin panel</a></li>
              <li><a href="./#">Log out</a></li>
            </Dropdown>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
