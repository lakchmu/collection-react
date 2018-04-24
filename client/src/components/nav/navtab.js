import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../home';

class Navtab extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navtab">
            <ul>
              <li><Link href="/" to="/">Home</Link></li>
              <li><a href="./#">All Series</a></li>
              <li><a href="./#">Info</a></li>
            </ul>
          </nav>

          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default Navtab;
