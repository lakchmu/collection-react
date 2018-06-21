import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { getJson } from '../../app-lib';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    getJson(this.props.requestPath)
      .then(response => this.setState({ data: response.data_list }));
  }

  render() {
    const listItem = this.state.data.map(item => (
      <li key={item.id ? item.id : item}>
        <NavLink
          href={`${this.props.linkTo}/${item.id ? item.id : item}${(this.props.pagesAreExpected) ? '/1' : ''}`}
          to={`${this.props.linkTo}/${item.id ? item.id : item}${(this.props.pagesAreExpected) ? '/1' : ''}`}
        ><i className="fas fa-angle-double-right" /> {item.name ? item.name : item} {item.status ? <i className="fas fa-check" /> : ''}
        </NavLink>
      </li>
    ));

    if (this.props.extra) {
      const itemAll = (
        <li key={this.props.extra}>
          <NavLink
            href={`${this.props.linkTo}/${this.props.extra}${(this.props.pagesAreExpected) ? '/1' : ''}`}
            to={`${this.props.linkTo}/${this.props.extra}${(this.props.pagesAreExpected) ? '/1' : ''}`}
          ><i className="fas fa-angle-double-right" /> {this.props.extra}
          </NavLink>
        </li>
      );
      listItem.unshift(itemAll);
    }

    return (
      <div>
        <nav className="sidebar">
          <ul>
            {listItem}
          </ul>
        </nav>

      </div>
    );
  }
}

Sidebar.defaultProps = {
  extra: '',
  pagesAreExpected: false,
};

Sidebar.propTypes = {
  requestPath: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  extra: PropTypes.string,
  pagesAreExpected: PropTypes.bool,
};

export default Sidebar;
