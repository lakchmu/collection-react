import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { getJson } from '../../app-lib';
import { API_METHOD_YEARS } from '../../constants';
import AllSeries from '../all-series';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { years: [] };
    getJson(API_METHOD_YEARS).then(response => this.setState({ years: response.list_of_years }));
  }

  render() {
    const listItem = this.state.years.map(year => (
      <li key={year}>
        <NavLink
          href={`/all-series/${year}`}
          to={`/all-series/${year}`}
        ><i className="fas fa-angle-double-right" /> {year}
        </NavLink>
      </li>
    ));
    return (
      <Router>
        <div>
          <nav className="sidebar">
            <ul>
              <li key="all">
                <NavLink
                  href="/all-series/all"
                  to="/all-series/all"
                ><i className="fas fa-angle-double-right" /> all
                </NavLink>
              </li>
              {listItem}
            </ul>
          </nav>

          <Route
            path="/all-series/:year"
            render={(props) => {
              console.warn(props);
              return <AllSeries {...props} />;
            }}
          />
        </div>
      </Router>
    );
  }
}

export default Sidebar;
