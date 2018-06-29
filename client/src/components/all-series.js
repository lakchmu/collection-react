/* eslint-disable */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES } from '../constants';
import Card from './card';
import Pagination from './nav/pagination';

class AllSeries extends Component {
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
      series: [],
      baseUrl: null,
      nextUrl: null,
      previousUrl: null,
      pageCount: null,
      currentPageNumber: null
    };
    this.getSeries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.year !== this.props.match.params.year ||
      prevProps.match.params.page !== this.props.match.params.page) {
      this.getSeries();
    }
  }

  getSeries() {
    const apiMethod = (this.props.match.params.year === 'all') ?
      `${API_METHOD_SERIES}?` :
      `${API_METHOD_SERIES}?year=${this.props.match.params.year}&`;
    const urlForRoute = (this.props.match.params.year === 'all') ?
      '/all-series/all' :
      `/all-series/${this.props.match.params.year}`;
    getJson(`${apiMethod}page=${this.props.match.params.page}`).then(response => {
      const mathResult = (response.previous) ? response.previous.match(/\?page=(\d+)/) : null;
      const previousPage = (mathResult !== null) ? Number.parseInt(mathResult[1], 10) : 0;
      this.setState({
        series: response.results,
        pageCount: Math.ceil(response.count / 15),
        currentPageNumber: previousPage + 1,
        baseUrl: urlForRoute,
        nextUrl: AllSeries.getUrl(urlForRoute, response.next),
        previousUrl: AllSeries.getUrl(urlForRoute, response.previous),
      })});
  }

  handlePaginationClick() {
    this.getSeries();
  }

  render() {
    return (
      <div className="all-series">
        <h1>All series {this.props.match.params.year}</h1>
        {this.state.series.map(serie => <Card serie={serie} key={serie.id} />)}
        {(this.state.pageCount !== 1) ?
          <Pagination
            pageCount={this.state.pageCount}
            currentPageNumber={this.state.currentPageNumber}
            baseUrl={this.state.baseUrl}
            nextUrl={this.state.nextUrl}
            previousUrl={this.state.previousUrl}
            onClick={this.handlePaginationClick}
            /> : ''
        }
      </div>
    );
  }
}

AllSeries.defaultProps = {
  match: {},
};

AllSeries.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default withRouter(AllSeries);
