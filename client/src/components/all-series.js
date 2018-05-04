import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES } from '../constants';
import Card from './card';

class AllSeries extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    this.getSeries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.year !== this.props.match.params.year) {
      this.getSeries();
    }
  }

  getSeries() {
    const apiMethod = (this.props.match.params.year === 'all') ?
      API_METHOD_SERIES :
      `${API_METHOD_SERIES}?year=${this.props.match.params.year}`;
    getJson(apiMethod).then(response => this.setState({ series: response.results }));
  }

  render() {
    return (
      <div className="all-series">
        <h1>All series {this.props.match.params.year}</h1>
        {this.state.series.map(serie => <Card serie={serie} key={serie.id} />)}
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
