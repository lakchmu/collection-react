import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navtab extends Component {
  render() {
    return (
      <nav className="navtab">
        <ul>
          <li><NavLink href="/home" to="/home">Home</NavLink></li>
          <li><NavLink href="/all-series/all" to="/all-series/all">All Series</NavLink></li>
          <li><NavLink href="/info" to="/info">Info</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default Navtab;
