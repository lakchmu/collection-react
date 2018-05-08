import React, { Component } from 'react';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES } from '../constants';

class WarningInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    getJson(`${API_METHOD_SERIES}?figurine__isnull=True`).then(response => this.setState({ series: response.results }));
  }

  render() {
    const { series } = this.state;
    return (
      <div className="warning-info">
        <table>
          <tr>
            <th>Year</th>
            <th>Series Title</th>
            <th>Series Id</th>
          </tr>
          <tbody>
            {series.map(s => (
              <tr>
                <td>{s.year}</td>
                <td>{s.name}</td>
                <td>{s.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default WarningInfo;
