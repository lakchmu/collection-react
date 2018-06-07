import React, { Component } from 'react';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES } from '../constants';

class WarningInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    getJson(`${API_METHOD_SERIES}?figurines__isnull=True`).then(response => this.setState({ series: response.results }));
  }

  render() {
    const { series } = this.state;
    return (
      <div className="warning-info">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Series Title</th>
              <th>Series Id</th>
            </tr>
          </thead>
          <tbody>
            {series.map(s => (
              <tr key={s.id}>
                <td className="text-center">{s.year}</td>
                <td>{s.name}</td>
                <td className="text-center">{s.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WarningInfo;
