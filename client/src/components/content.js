import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Storage from './../storage';
import Home from './home';
import Sidebar from './nav/sidebar';
import Info from './info';
import SerieDetail from './serie-detail';
import FormSerie from './form/form-serie';
import AllSeries from './all-series';
import SearchResult from './search-result';
import FigurineDetail from './figurine-detail';
import FormAddFigurine from './form/form-add-figurine';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    Storage.getYears().then(data => this.setState({ data }));
  }

  render() {
    const SearchResultWithRouter = withRouter(SearchResult);
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
            path="/all-series/:year/:page"
            render={props => (
              <Sidebar
                {...props}
                linkTo="/all-series"
                data={this.state.data}
                extra="all"
                pagesAreExpected
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
            path="/all-series/:year/:page"
            render={props => <AllSeries {...props} />}
          />
          <Route
            path="/search-result/:searchtext/:page"
            render={props => <SearchResultWithRouter {...props} />}
          />
          <Route
            path="/seriedetail/:id/figurine/add"
            render={props => <FormAddFigurine {...props} />}
            exact
          />
          <Route
            path="/seriedetail/:id/figurine/:id([0-9]*)"
            render={props => <FigurineDetail {...props} />}
            exact
          />
        </div>
      </Router>
    );
  }
}

Content.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};

export default Content;
