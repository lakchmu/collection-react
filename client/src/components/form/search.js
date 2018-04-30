import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <form className="search">
        <input id="search" name="search" type="text" placeholder="Search Here..." />
        <button type="submit">
          <i className="fas fa-search" />
        </button>
      </form>
    );
  }
}

export default Search;
