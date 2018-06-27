import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from '../../app-lib';
import { API_METHOD_SERIES } from '../../constants';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const searchText = event.target.search.value;
    getJson(`${API_METHOD_SERIES}?search=${searchText}`)
      .then(response => (
        this.props.history.push({
          pathname: '/search-result',
          search: '',
          state: { result: response.results },
        })));
  }

  render() {
    return (
      <form className="search" onSubmit={this.props.handleSearch || this.handleSearch}>
        <input id="search" name="search" type="text" placeholder="Search Here..." />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

Search.defaultProps = {
  handleSearch: undefined,
};

Search.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
  handleSearch: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.instanceOf(undefined),
  ]),
};

export default Search;
