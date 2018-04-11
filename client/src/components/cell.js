import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Cell extends Component {
  render() {
    const { serie } = this.props;
    return (
      <div className="cell" >
        <div className="cell-content">
          <i className="fas fa-info-circle cell-icon" />
          <img src={serie.image} alt="Serie" />
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
