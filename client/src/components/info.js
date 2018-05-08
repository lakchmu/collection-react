import React, { Component } from 'react';
import SeriesForDecades from './series-for-decades';
import GeneralInfo from './general-info';
import WarningInfo from './warning-info';

class Info extends Component {
  render() {
    return (
      <div className="info">
        <GeneralInfo />
        <div className="diagram">
          <img
            src="https://naprimerax.org/images/621/grafik-kursa-dollara-za-2016-god-kak-postroit-grafik-v-excel.png"
            alt="diagram"
          />
        </div>
        <WarningInfo />
        <SeriesForDecades />
      </div>
    );
  }
}

export default Info;
