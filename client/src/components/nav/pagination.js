/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';

class Pagination extends Component {
  static handleClick() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  constructor(props) {
    super(props);
    this.getMenu = this.getMenu.bind(this);
  }

  getMenu() {
    const { pageCount, currentPageNumber } = this.props;
    const data = [];

    if (pageCount <= 10) {
      for (let i = 1; i <= pageCount; i += 1) {
        data.push({ label: i, clickable: true });
      }
    } else {
      const showInitialEllipsis = !(currentPageNumber <= 5);
      const showEndEllipsis = !(currentPageNumber > (pageCount - 6));
      let start = currentPageNumber - 1;
      let end = currentPageNumber + 2;
      if (currentPageNumber <= 5) {
        start = 4;
        end = 7;
      } else if (currentPageNumber > (pageCount - 6)) {
        start = pageCount - 6;
        end = pageCount - 3;
      }

      data.push({ label: 1, clickable: true });
      data.push({ label: 2, clickable: true });
      data.push({ label: showInitialEllipsis ? '...' : '3', clickable: !showInitialEllipsis });

      for (let i = start; i <= end; i += 1) {
        data.push({ label: i, clickable: true });
      }

      data.push({ label: showEndEllipsis ? '...' : pageCount - 2, clickable: !showEndEllipsis });
      data.push({ label: pageCount - 1, clickable: true });
      data.push({ label: pageCount, clickable: true });
    }
    return data.map((item, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li key={index}>
        {
          (item.clickable) ?
            <NavLink
              href={`${this.props.baseUrl}/${item.label}`}
              to={`${this.props.baseUrl}/${item.label}`}
              onClick={Pagination.handleClick}
            >{item.label}
            </NavLink> :
            <strong>{item.label}</strong>
        }
      </li>
    ));
  }

  render() {
    return (
      <nav className="pagination">
        <ul>
          {
            (this.props.previousUrl) ?
              <li>
                <Link
                  href={this.props.previousUrl}
                  to={this.props.previousUrl}
                  onClick={Pagination.handleClick}
                >
                  <i className="fas fa-angle-double-left" />Previous
                </Link>
              </li> : ''
          }
          {this.getMenu()}
          {
            (this.props.nextUrl) ?
              <li>
                <Link
                  href={this.props.nextUrl}
                  to={this.props.nextUrl}
                  onClick={Pagination.handleClick}
                >
                  Next <i className="fas fa-angle-double-right" />
                </Link>
              </li> : ''
          }
        </ul>
      </nav>
    );
  }
}

Pagination.defaultProps = {
  pageCount: 0,
  currentPageNumber: 0,
  baseUrl: '',
  nextUrl: '',
  previousUrl: '',
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  currentPageNumber: PropTypes.number,
  baseUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  previousUrl: PropTypes.string,
};
export default Pagination;
