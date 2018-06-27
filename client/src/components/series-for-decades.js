import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from './modal';
import Search from './form/search';
import { getJson, deepCopy } from '../app-lib';
import { API_METHOD_SERIES, API_METHOD_YEARS } from '../constants';
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
    getJson(`${API_METHOD_YEARS}`)
      .then(response => this.setState({ years: response.data_list }));
  }

  handleClickCell(year) {
    getJson(`${API_METHOD_SERIES}?year=${year}&status=bought`)
      .then((response) => {
        this.setState({
          data: response.results,
          modalsState: deepCopy(response.results),
          currentYear: year,
        });
        this.modalAnchor.current.click();
      });
  }

  handleSearch(event) {
    event.preventDefault();
    const searchText = event.target.search.value;
    getJson(`${API_METHOD_SERIES}?year=${this.state.currentYear}&status=bought&search=${searchText}`)
      .then((response) => {
        this.setState({ modalsState: response.results });
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
