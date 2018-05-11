import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { API_METHOD_YEARS } from '../../constants';
import Home from '../home';
import Sidebar from './sidebar';
import Info from '../info';
import SerieDetail from '../serie-detail';

class Navtab extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navtab">
            <ul>
              <li><NavLink href="/home" to="/home">Home</NavLink></li>
              <li><NavLink href="/all-series/all" to="/all-series/all">All Series</NavLink></li>
              <li><NavLink href="/info" to="/info">Info</NavLink></li>
            </ul>
          </nav>

          <Route exact path="/home" component={Home} />
          <Route exact path="/info" component={Info} />
          <Route
            exact
            path="/all-series/:year"
            render={props => (
              <Sidebar
                {...props}
                linkTo="/all-series"
                routePath="/all-series/:year"
                requestPath={API_METHOD_YEARS}
                extra="all"
              />)}
          />
          <Route
            exact
            path="/seriedetail/:id"
            render={props => <SerieDetail {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default Navtab;
