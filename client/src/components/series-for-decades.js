import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Storage from './../storage';
import Modal from './modal';
import Search from './form/search';
import { deepCopy } from '../app-lib';
import Card from './card';

class SeriesForDecades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalsState: [],
      years: [],
      currentYear: null,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.toolBar = React.createRef();
    this.modalAnchor = React.createRef();
    Storage.getYears().then(years => this.setState({ years }));
  }

  handleClickCell(year) {
    Storage
      .getSeries([{ filter: 'year', value: `${year}` }, { filter: 'status', value: 'bought' }])
      .then((data) => {
        this.setState({
          data,
          modalsState: deepCopy(data),
          currentYear: year,
        });
        this.modalAnchor.current.click();
      });
  }

  handleSearch(event) {
    event.preventDefault();
    const searchText = event.target.search.value;
    Storage.getSeries([
      { filter: 'year', value: this.state.currentYear },
      { filter: 'status', value: 'bought' },
      { filter: 'search', value: searchText },
    ]).then((series) => {
      this.setState({ modalsState: series });
      this.toolBar.current.classList.add('show');
    });
  }

  handleClickBack() {
    const { data } = this.state;
    this.setState({ modalsState: deepCopy(data) });
    this.toolBar.current.classList.remove('show');
  }

  render() {
    const { years, modalsState } = this.state;
    const SearchWithRouter = withRouter(Search);
    const listCell = years.map(year => (
      <button
        className="cell"
        onClick={() => this.handleClickCell(year)}
        key={year}
      >{year}
      </button>
    ));
    return (
      <div className="series-for-decades">
        { listCell }
        <Modal anchor={<span ref={this.modalAnchor} />}>
          <div className="modal-title">{this.state.currentYear}</div>
          <SearchWithRouter handleSearch={e => this.handleSearch(e)} />
          <div className="modal-body">
            <div className="row tool-bar" ref={this.toolBar}>
              <div className="col-12">
                <button
                  className="button button-reverse"
                  type="button"
                  onClick={() => this.handleClickBack()}
                ><i className="fas fa-arrow-circle-left" />Back
                </button>
              </div>
            </div>
            {modalsState.map(serie => (
              <Card serie={serie} key={serie.id} />
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default SeriesForDecades;
