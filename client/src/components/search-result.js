import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './card';


class SearchResult extends Component {
  render() {
    const { result } = this.props.location.state;
    return (
      <div className="home">
        <h1>Search result ({result.length})</h1>
        {
          (result.length) ?
          result.map(serie => <Card serie={serie} key={serie.id} />) :
          <p>Nothing found on your request</p>
        }
      </div>
    );
  }
}

SearchResult.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
};

export default SearchResult;
