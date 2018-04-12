import React, { Component } from 'react';
import { getCountInfo } from '../../app-lib';

class CountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { countInfo: { series_count: 0, figurine_count: 0, cost: 0 } };
    getCountInfo().then((response) => {
      this.setState({ countInfo: response });
    });
  }

  render() {
    const { countInfo } = this.state;
    return (
      <div className="navbar-info">
        <i className="fas fa-chess icon-info" />{countInfo.series_count} /
        <i className="fas fa-chess-queen icon-info" />{countInfo.figurine_count} /
        <i className="fas fa-ruble-sign icon-info" />{countInfo.cost}
      </div>
    );
  }
}

export default CountInfo;
