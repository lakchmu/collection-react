import React, { Component } from 'react';
import Modal from './modal';
import Search from './form/search';
// import { getJson } from '../app-lib';
// import { API_METHOD_SERIES } from '../constants';

class SeriesForDecades extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { series: [] };
  //   getJson(`${API_METHOD_SERIES}?show_on_the_home=True`)
  //     .then(response => this.setState({ series: response.results }));
  // }

  render() {
    return (
      <div className="series-for-decades">
        <Modal anchor={<div className="cell">2001</div>}>
          <div className="modal-title">2001</div>
          <Search />
          <div className="modal-body">
            <ul>
              <li>series name</li>
              <li>series name</li>
              <li>series name</li>
            </ul>
          </div>
        </Modal>
        <Modal anchor={<div className="cell">2002</div>}>
          <div className="modal-title">2002</div>
          <Search />
          <div className="modal-body">
            <ul>
              <li>series name</li>
              <li>series name</li>
              <li>series name</li>
            </ul>
          </div>
        </Modal>
        <Modal anchor={<div className="cell">2003</div>}>
          <div className="modal-title">2003</div>
          <Search />
          <div className="modal-body">
            <ul>
              <li>series name</li>
              <li>series name</li>
              <li>series name</li>
            </ul>
          </div>
        </Modal>
      </div>
    );
  }
}

export default SeriesForDecades;
