import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Home from '../home';
import Sidebar from './sidebar';

class Navtab extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navtab">
            <ul>
              <li><NavLink href="/" to="/">Home</NavLink></li>
              <li><NavLink href="/all-series/all" to="/all-series/all">All Series</NavLink></li>
              <li><a href="./#">Info</a></li>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
          <Route exact path="/all-series/:year" component={Sidebar} />
        </div>
      </Router>
    );
  }
}

export default Navtab;
