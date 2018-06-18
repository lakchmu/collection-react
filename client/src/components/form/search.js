import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from '../../app-lib';
import { API_METHOD_SERIES } from '../../constants';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
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
      <form className="search" onSubmit={e => this.handleSubmit(e)}>
        <input id="search" name="search" type="text" placeholder="Search Here..." />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

Search.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Search;
