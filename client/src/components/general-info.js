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
          <thead>
            <tr>
              <th />
              <th>All</th>
              <th>Kinder</th>
              <th>Other</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Series in base</td>
              <td className="text-center">{data.series_count}</td>
              <td className="text-center">{data.kinder_series_count}</td>
              <td className="text-center">{data.other_series_count}</td>
            </tr>
            <tr>
              <td>Figurine in base</td>
              <td className="text-center">{data.meta_figurine_count}</td>
              <td className="text-center">{data.kinder_meta_figurine_count}</td>
              <td className="text-center">{data.other_meta_figurine_count}</td>
            </tr>
            <tr>
              <td>Series in collection</td>
              <td className="text-center">{data.my_series_count}</td>
              <td className="text-center">{data.kinder_my_series_count}</td>
              <td className="text-center">{data.other_my_series_count}</td>
            </tr>
            <tr>
              <td>Figurine in collection</td>
              <td className="text-center">{data.figurine_count}</td>
              <td className="text-center">{data.kinder_figurine_count}</td>
              <td className="text-center">{data.other_figurine_count}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default GeneralInfo;
