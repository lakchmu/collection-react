import React, { Component } from 'react';
import MetricsGraphics from 'react-metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';
import { getJson } from './../app-lib';
import { API_METHOD_FIGURINES_BY_YEAR } from './../constants';
import SeriesForDecades from './series-for-decades';
import GeneralInfo from './general-info';
import WarningInfo from './warning-info';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    getJson(API_METHOD_FIGURINES_BY_YEAR)
      .then(response => this.setState({ data: response.data_list }));
  }

  render() {
    return (
      <div className="info">
        <MetricsGraphics
          animate_on_load
          area={false}
          data={this.state.data}
          width={978}
          height={350}
          x_accessor="year"
          y_accessor="figurines"
          x_rug="true"
          xax_format={a => a}
        />
        <GeneralInfo />
        <WarningInfo />
        <SeriesForDecades />
      </div>
    );
  }
}

export default Info;
