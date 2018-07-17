/* global window */

import React, { Component } from 'react';
import MetricsGraphics from 'react-metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';
import Storage from './../storage';
import SeriesForDecades from './series-for-decades';
import GeneralInfo from './general-info';
import WarningInfo from './warning-info';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.getData = this.getData.bind(this);
    Storage.getFigurinesByYear().then(data => this.setState({ data }));
  }

  getData() {
    return this.state.data.map(item => (
      { figurines: item.figurines, year: new Date(item.year, 11, 31) }
    ));
  }

  render() {
    const width = (window.innerWidth >= 978) ? 978 : (window.innerWidth - 10);
    return (
      <div className="info">
        { (this.state.data.length > 0) ? (
          <MetricsGraphics
            animate_on_load
            area={false}
            data={this.getData()}
            width={width}
            height={250}
            x_accessor="year"
            y_accessor="figurines"
            x_rug="true"
            x_mouseover={a => `In ${a.year.getFullYear()}, `}
            y_mouseover={a => `there are ${a.figurines} figurines`}
          />) : ''
        }
        <SeriesForDecades />
        <div className="info_table-wrapper">
          <GeneralInfo />
          <WarningInfo />
        </div>
      </div>
    );
  }
}

export default Info;
