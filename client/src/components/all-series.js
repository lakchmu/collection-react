import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES, API_METHOD_SERIES_OF_YEAR } from '../constants';
import Sidebar from './nav/sidebar';
import Cell from './cell';

class AllSeries extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    if (this.props.match.params.year === undefined) {
      getJson(API_METHOD_SERIES).then(response => this.setState({ series: response.results }));
    } else {
      getJson(`${API_METHOD_SERIES_OF_YEAR}/${this.props.match.params.year}`)
        .then(response => this.setState({ series: response.list_of_series }));
    }
    setInterval( () => { console.log(this.props.params && this.props.params.id)}, 1500)//eslint-disable-line
  }
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <div className="all-series">
        <h1>All series {this.props.match.params.year}</h1>
        <Sidebar />
        {this.state.series.map(serie => <Cell serie={serie} key={serie.id} />)}
      </div>
    );
  }
}

AllSeries.defaultProps = {
  match: {},
};

AllSeries.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default withRouter(AllSeries);
