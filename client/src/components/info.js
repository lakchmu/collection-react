import React, { Component } from 'react';
import SeriesForDecades from './series-for-decades';
// import { getJson } from '../app-lib';
// import { API_METHOD_SERIES } from '../constants';

class Info extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { series: [] };
  //   getJson(`${API_METHOD_SERIES}?show_on_the_home=True`)
  //     .then(response => this.setState({ series: response.results }));
  // }

  render() {
    return (
      <div className="info">
        <div className="general-info">
          <table>
            <tr>
              <th />
              <th>All</th>
              <th>Kinder</th>
              <th>Other</th>
            </tr>
            <tr>
              <td>Series in base</td>
              <td>xxx</td>
              <td>xxx</td>
              <td>xxx</td>
            </tr>
            <tr>
              <td>Figurine in base</td>
              <td>xxx</td>
              <td>xxx</td>
              <td>xxx</td>
            </tr>
            <tr>
              <td>Series in collection</td>
              <td>xxx</td>
              <td>xxx</td>
              <td>xxx</td>
            </tr>
            <tr>
              <td>Figurine in collection</td>
              <td>xxx</td>
              <td>xxx</td>
              <td>xxx</td>
            </tr>
          </table>
        </div>
        <div className="diagram">
          <img
            src="https://naprimerax.org/images/621/grafik-kursa-dollara-za-2016-god-kak-postroit-grafik-v-excel.png"
            alt="diagram"
          />
        </div>
        <div className="warning-info">
          <table>
            <tr>
              <th>Year</th>
              <th>Series Title</th>
              <th>Series Id</th>
            </tr>
            <tr>
              <td>1974</td>
              <td>Балерины</td>
              <td>667</td>
            </tr>
            <tr>
              <td>1974</td>
              <td>Балерины</td>
              <td>667</td>
            </tr>
            <tr>
              <td>1974</td>
              <td>Балерины</td>
              <td>667</td>
            </tr>
          </table>
        </div>
        <SeriesForDecades />
      </div>
    );
  }
}

export default Info;
