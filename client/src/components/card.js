import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './tooltip';
import { getJson } from '../app-lib';
import { API_METHOD_SERIE_FIGURINE_INFO } from '../constants';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serieFigurineInfo: {
        not_bought_figurine: [],
        bought_figurine: [],
        bought_figurine_count: null,
        not_bought_figurine_count: null,
      },
    };
    getJson(`${API_METHOD_SERIE_FIGURINE_INFO}/${this.props.serie.id}`)
      .then(response => this.setState({ serieFigurineInfo: response }));
  }

  render() {
    const { serie } = this.props;
    const info = this.state.serieFigurineInfo;
    return (
      <div className="card" >
        <img className="image" src={serie.image} alt="Serie" />
        <div className="card-body">
          <h3 className="card-header">{serie.name}</h3>
          <div className="card-footer">
            <i className="fas fa-chess-queen card-icon" />
            <strong>
              In:
              <Tooltip tooltipText={info.bought_figurine.join(', ') || '-'}><span>{info.bought_figurine_count}</span></Tooltip>
              | Out:
              <Tooltip tooltipText={info.not_bought_figurine.join(', ') || '-'}><span>{info.not_bought_figurine_count}</span></Tooltip>
            </strong>
            <div className="fl-right">
              <a className="card-link" href="./#">Read More</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  serie: {},
};

Card.propTypes = {
  serie: PropTypes.instanceOf(Object),
};

export default Card;
