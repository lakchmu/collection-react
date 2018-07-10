import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import PaginationWrapper from './pagination-wrapper';
import { API_METHOD_SERIES } from './../constants';
import { PaginationDataConsumer } from '../context/pagination-data';


class SearchResult extends Component {
  render() {
    const { searchtext } = this.props.match.params;
    return (
      <PaginationDataConsumer>
        {({ paginationData, changePaginationData }) => (
          <div className="search-result">
            <h1>Search result ({paginationData.length})</h1>
            <PaginationWrapper
              apiMethod={`${API_METHOD_SERIES}?search=${searchtext}`}
              baseUrl={`/search-result/${searchtext}`}
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

SearchResult.defaultProps = {
  match: {},
};

SearchResult.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default SearchResult;
