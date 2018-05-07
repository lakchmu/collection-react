import React, { Component } from 'react';
import { getJson } from '../app-lib';
import { API_METHOD_GENERAL_INFO } from '../constants';

class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    getJson(API_METHOD_GENERAL_INFO)
      .then(response => this.setState({ data: response }));
  }

  render() {
    const { data } = this.state;
    return (
      <div className="general-info">
        <table>
          <tr>
            <th />
            <th>All</th>
            <th>Kinder</th>
            <th>Other</th>
          </tr>
          <tbody>
            <tr>
              <td>Series in base</td>
              <td>{data.series_count}</td>
              <td>{data.kinder_series_count}</td>
              <td>{data.other_series_count}</td>
            </tr>
            <tr>
              <td>Figurine in base</td>
              <td>{data.meta_figurine_count}</td>
              <td>{data.kinder_meta_figurine_count}</td>
              <td>{data.other_meta_figurine_count}</td>
            </tr>
            <tr>
              <td>Series in collection</td>
              <td>{data.my_series_count}</td>
              <td>{data.kinder_my_series_count}</td>
              <td>{data.other_my_series_count}</td>
            </tr>
            <tr>
              <td>Figurine in collection</td>
              <td>{data.figurine_count}</td>
              <td>{data.kinder_figurine_count}</td>
              <td>{data.other_figurine_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GeneralInfo;
