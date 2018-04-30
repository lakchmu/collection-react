import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './tooltip';
import { getJson } from '../app-lib';
import { API_METHOD_SERIE_FIGURINE_INFO } from '../constants';

class Cell extends Component {
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
    console.warn(this.state.serieFigurineInfo);
    return (
      <div className="cell" >
        <img className="image" src={serie.image} alt="Serie" />
        <div className="cell-body">
          <h3 className="cell-header">{serie.name}</h3>
          <div className="cell-footer">
            <i className="fas fa-chess-queen cell-icon" />
            <strong>
              In:
              <span>
                <Tooltip tooltipText={info.bought_figurine.join(', ') || '-'}> {info.bought_figurine_count} </Tooltip>
              </span>
              | Out:
              <span>
                <Tooltip tooltipText={info.not_bought_figurine.join(', ') || '-'}> {info.not_bought_figurine_count}</Tooltip>
              </span>
            </strong>
            <div className="fl-right">
              <a className="cell-link" href="./#">Read More</a>
            </div>
          </div>
        </div>
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
