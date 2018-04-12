import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <form className="search">
        <input id="search" name="search" type="text" placeholder="Search" />
        <label htmlFor="search">
          <i className="fas fa-search" />
        </label>
      </form>
    );
  }
}

export default Search;
