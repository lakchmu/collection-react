import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from './../app-lib';
import { API_METHOD_SERIES,
  API_METHOD_FIGURINE_OF_SERIES,
  API_METHOD_COST_OF_SERIES_FIGURINE,
} from './../constants';
import Sidebar from './nav/sidebar';
import FigurineDetail from './figurine-detail';

class SerieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { serie: {}, cost: 0 };
    getJson(`${API_METHOD_SERIES}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ serie: response.results[0] }));
    getJson(`${API_METHOD_COST_OF_SERIES_FIGURINE}/${this.props.match.params.id}`)
      .then(response => this.setState({ cost: response.cost }));
  }

  render() {
    const { serie, cost } = this.state;
    return (
      <div className="serie-detail">
        <h2>
          {serie.name}
          <small> {serie.year} <a href="./#"><i className="fas fa-pencil-alt" /></a></small>
        </h2>
        <div className="col-50">
          <img className="image" src={serie.image} alt="" />
          <img src={serie.photo} alt="" />
        </div>
        <div className="col-25 text-center">
          <p>Company: {serie.company}</p>
          <p>Made in: {serie.made_in}</p>
          <p>Cost: {cost} <i className="fas fa-ruble-sign" /></p>
        </div>
        <div className="col-25">
          {(serie.id) ? (
            <Sidebar
              linkTo={`${this.props.match.url}/figurine`}
              routePath={`${this.props.match.url}/figurine/:id`}
              requestPath={`${API_METHOD_FIGURINE_OF_SERIES}/${serie.id}`}
              extra="add"
              component={FigurineDetail}
            />
          ) : ''}
        </div>
      </div>
    );
  }
}

SerieDetail.defaultProps = {
  match: {},
};

SerieDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default SerieDetail;
