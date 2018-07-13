import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getJson } from './../app-lib';
import { API_METHOD_SERIES } from './../constants';
import Sidebar from './nav/sidebar';


class SerieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { serie: { figurines: [] } };
    this.getSerieCost = this.getSerieCost.bind(this);
    getJson(`${API_METHOD_SERIES}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ serie: response.results[0] }));
  }

  getSerieCost() {
    const { figurines } = this.state.serie;
    return figurines.reduce(((cost, figurine) => cost + figurine.cost), 0);
  }

  render() {
    const { serie } = this.state;
    return (
      <div className="serie-detail">
        <h1>
          {serie.name}
          <small> {serie.year} <NavLink href={`/editserie/${serie.id}`} to={`/editserie/${serie.id}`}><i className="fas fa-pencil-alt" /></NavLink></small>
        </h1>
        <div className="images-wrapper">
          <img src={serie.image} alt="" />
          <img src={serie.photo} alt="" />
        </div>
        <div className="serie-info text-center">
          <p>Company: {serie.company}</p>
          <p>Made in: {serie.made_in}</p>
          <p>Cost: {this.getSerieCost()} <i className="fas fa-ruble-sign" /></p>
        </div>
        {(serie.id) ? (
          <Sidebar
            linkTo={`${this.props.match.url}/figurine`}
            data={serie.figurines}
            extra="add"
          />
        ) : ''}
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
