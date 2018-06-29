import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: `/search-result/${event.target.search.value}/1`,
      search: '',
      state: {},
    });
  }

  render() {
    return (
      <form
        className="search"
        onSubmit={
          this.props.handleSearch ||
          (e => this.handleSearch(e))
        }
      >
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
