import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { API_METHOD_YEARS } from '../constants';
import Home from './home';
import Sidebar from './nav/sidebar';
import Info from './info';
import SerieDetail from './serie-detail';
import FormSerie from './form/form-serie';
// import NewSerie from './form/new-serie';
import AllSeries from './all-series';
import FigurineDetail from './figurine-detail';

class Content extends Component {
  render() {
    return (
      <Router>
        <div className="content">
          {this.props.children}

          <Route exact path="/home" component={Home} />
          <Route
            exact
            path="/newserie"
            render={props => <FormSerie {...props} header="New serie" />}
          />
          <Route exact path="/info" component={Info} />
          <Route
            exact
            path="/all-series/:year"
            render={props => (
              <Sidebar
                {...props}
                linkTo="/all-series"
                requestPath={API_METHOD_YEARS}
                extra="all"
              />)}
          />
          <Route
            exact
            path="/seriedetail/:id"
            render={props => <SerieDetail {...props} />}
          />
          <Route
            exact
            path="/editserie/:id"
            render={props => <FormSerie {...props} header="Edit serie" />}
          />
          <Route
            path="/all-series/:year"
            render={props => <AllSeries {...props} />}
          />
          <Route
            path="/seriedetail/:id/figurine/:id"
            render={props => <FigurineDetail {...props} />}
          />
        </div>
      </Router>
    );
  }
}

Content.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Content;
