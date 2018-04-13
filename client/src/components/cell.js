import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tooltip from './tooltip';

class Cell extends Component {
  render() {
    const { serie } = this.props;
    return (
      <div className="cell" >
        <div className="cell-content">
          <Tooltip tooltipText="Hello">
            <i className="fas fa-info-circle cell-icon" />
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
