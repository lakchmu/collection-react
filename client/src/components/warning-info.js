import React, { Component } from 'react';
import Storage from './../storage';

class WarningInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { series: [] };
    Storage
      .getSeries([{ filter: 'figurines__isnull', value: 'True' }])
      .then(series => this.setState({ series }));
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
