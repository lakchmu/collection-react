/* global document, window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    this.node = document.createElement('div');
    this.node.className = 'tooltip-body';
    this.node.textContent = this.props.tooltipText;
    const targetCoordinates = e.target.getBoundingClientRect();
    document.body.appendChild(this.node);
    this.node.style.left = `${targetCoordinates.left}px`;
    this.node.style.top = `${targetCoordinates.top + (window.pageYOffset - this.node.offsetHeight - targetCoordinates.height)}px`;
  }

  handleMouseLeave() {
    this.node.remove();
  }

  render() {
    return (
      <span
        className="tooltip"
        onMouseEnter={e => this.handleMouseEnter(e)}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.props.children}
      </span>
    );
  }
}

Tooltip.defaultProps = {};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltipText: PropTypes.string.isRequired,
};

export default Tooltip;
