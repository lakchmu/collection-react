import React, { Component } from 'react';
import { getSeries } from '../app-lib';
import Cell from './cell';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    getSeries().then(response => this.setState({ series: response.results }));
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
