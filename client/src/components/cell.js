import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from '../app-lib';
import { API_METHOD_SERIE_FIGURINE_INFO } from '../constants';
import Tooltip from './tooltip';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = { serieFigurineInfo: { not_bought_figurine: null, bought_figurine: null } };
    getJson(`${API_METHOD_SERIE_FIGURINE_INFO}/${this.props.serie.id}`)
      .then(response => this.setState({ serieFigurineInfo: response }));
  }

  render() {
    const { serie } = this.props;
    const info = this.state.serieFigurineInfo;
    const tooltipText = `Bought figurine: ${info.bought_figurine}. Not bought figurine: ${info.not_bought_figurine}`;
    console.warn(this.state.serieFigurineInfo);
    return (
      <div className="cell" >
        <div className="cell-content">
          <Tooltip tooltipText={tooltipText}>
            <i className="fas fa-chess-queen cell-icon" />
          </Tooltip>
          <img className="image" src={serie.image} alt="Serie" />
          <img className="photo" src={serie.photo} alt="Serie" />
          <a className="cell-link" href="./#">More</a>
        </div>
        <div className="cell-header">{serie.name}</div>
      </div>
    );
  }
}

Cell.defaultProps = {
  serie: {},
};

Cell.propTypes = {
  serie: PropTypes.instanceOf(Object),
};

export default Cell;
