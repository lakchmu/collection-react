import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={this.handleClick}>
          <i className="fas fa-user" />
          <i className="fas fa-sort-down" />
        </button>
        <ul className={this.state.isToggleOn ? 'dropdown-menu' : 'dropdown-menu open'}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

Dropdown.defaultProps = {
  children: <li />,
};

Dropdown.propTypes = {
  children: PropTypes.node,
};


export default Dropdown;
