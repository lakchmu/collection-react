import React, { Component } from 'react';
import Storage from './../storage';
import Card from './card';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    Storage.getSeries([{ filter: 'show_on_the_home', value: 'True' }]).then(series => this.setState({ series }));
  }

  render() {
    return (
      <div className="home">
        <h1>Home</h1>
        {this.state.series.map(serie => <Card serie={serie} key={serie.id} />)}
      </div>
    );
  }
}

export default Home;
