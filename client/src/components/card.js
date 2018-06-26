import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from './tooltip';

class Card extends Component {
  constructor(props) {
    super(props);
    this.getFigurineInfo = this.getFigurineInfo.bind(this);
  }

  getFigurineInfo() {
    const { serie } = this.props;
    const figurineInfo = { not_bought_figurine: [], bought_figurine: [] };
    figurineInfo.not_bought_figurine = serie.figurines.filter(figurine => figurine.status);
    figurineInfo.not_bought_figurine = serie.figurines
      .filter(figurine => !figurine.status)
      .map(figurine => figurine.name);
    figurineInfo.bought_figurine = serie.figurines
      .filter(figurine => figurine.status)
      .map(figurine => figurine.name);
    return figurineInfo;
  }

  render() {
    const { serie, apiUrl } = this.props;
    const info = this.getFigurineInfo();
    return (
      <div className="card" >
        <img className="image" src={`${apiUrl}${serie.image}`} alt="Serie" />
        <div className="card-body">
          <h3 className="card-header">{serie.name}</h3>
          <div className="card-footer">
            <i className="fas fa-chess-queen card-icon" />
            <strong>
              In:
              <Tooltip tooltipText={info.bought_figurine.join(', ') || '-'}><span>{info.bought_figurine.length}</span></Tooltip>
              | Out:
              <Tooltip tooltipText={info.not_bought_figurine.join(', ') || '-'}><span>{info.not_bought_figurine.length}</span></Tooltip>
            </strong>
            <div className="fl-right">
              <Link className="card-link" href="./#" to={`/seriedetail/${serie.id}`}>Read More</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  serie: {},
  apiUrl: '',
};

Card.propTypes = {
  serie: PropTypes.instanceOf(Object),
  apiUrl: PropTypes.string,
};

export default Card;
