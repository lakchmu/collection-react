import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from '../app-lib';
import Pagination from './nav/pagination';

class PaginationWrapper extends Component {
  static getUrl(apiMethod, pageUrl) {
    let result;
    if (pageUrl !== null) {
      const mathResult = pageUrl.match(/\?page=(\d+)/);
      const currentPageNumber = (mathResult !== null) ? mathResult[1] : '1';
      result = `${apiMethod}/${currentPageNumber}`;
    } else {
      result = null;
    }
    return result;
  }

  constructor(props) {
    super(props);
    this.state = {
      nextUrl: null,
      previousUrl: null,
      pageCount: null,
      currentPageNumber: null,
    };
    this.getData = this.getData.bind(this);
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page || prevProps.apiMethod !== this.props.apiMethod) {
      this.getData();
    }
  }

  getData() {
    getJson(`${this.props.apiMethod}&page=${this.props.page}`).then((response) => {
      const mathResult = (response.previous) ? response.previous.match(/\?page=(\d+)/) : null;
      const previousPage = (mathResult !== null) ? Number.parseInt(mathResult[1], 10) : 0;
      this.setState({
        pageCount: Math.ceil(response.count / 15),
        currentPageNumber: previousPage + 1,
        nextUrl: PaginationWrapper.getUrl(this.props.baseUrl, response.next),
        previousUrl: PaginationWrapper.getUrl(this.props.baseUrl, response.previous),
      });
      this.props.changePaginationData(response.results);
    });
  }

  render() {
    return (
      <div className="pagination-wrapper">
        {this.props.children}
        {(this.state.pageCount !== 1) ?
          <Pagination
            pageCount={this.state.pageCount}
            currentPageNumber={this.state.currentPageNumber}
            baseUrl={this.props.baseUrl}
            nextUrl={this.state.nextUrl}
            previousUrl={this.state.previousUrl}
          /> : ''
        }
      </div>
    );
  }
}

PaginationWrapper.propTypes = {
  page: PropTypes.string.isRequired,
  apiMethod: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  changePaginationData: PropTypes.func.isRequired,
};

export default PaginationWrapper;
