import React, { Component } from 'react';
import Modal from './modal';
import Search from './form/search';
import { getJson } from '../app-lib';
import { API_METHOD_SERIES_FOR_DECADES } from '../constants';

class SeriesForDecades extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    getJson(`${API_METHOD_SERIES_FOR_DECADES}`)
      .then(response => this.setState({ data: response.data_list }));
  }

  render() {
    const { data } = this.state;
    const listModal = data.map(item => (
      <Modal anchor={<div className="cell">{item.year}</div>} key={item.year}>
        <div className="modal-title">{item.year}</div>
        <Search />
        <div className="modal-body">
          <ul>
            {item.series.map(series => <li key={series.id}>{series.name}</li>)}
          </ul>
        </div>
      </Modal>
    ));
    return (
      <div className="series-for-decades">
        { listModal }
      </div>
    );
  }
}

export default SeriesForDecades;
