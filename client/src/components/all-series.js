import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { API_METHOD_SERIES } from '../constants';
import Card from './card';
import PaginationWrapper from './pagination-wrapper';
import { PaginationDataConsumer } from '../context/pagination-data';

class AllSeries extends Component {
  render() {
    const apiMethod = (this.props.match.params.year === 'all') ?
      `${API_METHOD_SERIES}?` :
      `${API_METHOD_SERIES}?year=${this.props.match.params.year}&`;
    const baseUrl = (this.props.match.params.year === 'all') ?
      '/all-series/all' :
      `/all-series/${this.props.match.params.year}`;
    return (
      <PaginationDataConsumer>
        {({ paginationData, changePaginationData }) => (
          <div className="all-series">
            <h1>All series {this.props.match.params.year}</h1>
            <PaginationWrapper
              apiMethod={apiMethod}
              baseUrl={baseUrl}
              page={this.props.match.params.page}
              paginationData={paginationData}
              changePaginationData={changePaginationData}
            >
              {
                (paginationData.length) ?
                paginationData.map(serie => <Card serie={serie} key={serie.id} />) :
                <p>Nothing found on your request</p>
              }
            </PaginationWrapper>
          </div>
        )}
      </PaginationDataConsumer>
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
