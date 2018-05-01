import React, { Component } from 'react';
import { getJson } from '../app-lib';
import { API_METHOD_HOME_SERIES } from '../constants';
import Cell from './cell';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    getJson(API_METHOD_HOME_SERIES).then(response => this.setState({ series: response.results }));
  }

  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        {this.state.series.map(serie => <Cell serie={serie} key={serie.image} />)}
      </div>
    );
  }
}

export default Home;
