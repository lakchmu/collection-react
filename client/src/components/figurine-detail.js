import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from './../app-lib';
import { API_METHOD_FIGURINE, API_METHOD_SERIES, API_METHOD_PHOTO_FIGURINE } from './../constants';
import Modal from './modal';
import Dropbox from './form/dropbox';
import { PhotoConsumer } from '../context/photo';

class FigurineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { figurine: {}, serie: {}, photos: [] };
    getJson(`${API_METHOD_FIGURINE}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ figurine: response.results[0] }))
      .then(() => (
        getJson(`${API_METHOD_SERIES}?id=${this.state.figurine.series}`)
          .then(response => this.setState({ serie: response.results[0] }))
      ));
    getJson(`${API_METHOD_PHOTO_FIGURINE}?figurine=${this.props.match.params.id}`)
      .then(response => this.setState({ photos: response.results }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getSeries();
    }
  }

  getSeries() {
    getJson(`${API_METHOD_FIGURINE}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ figurine: response.results[0] }));
  }

  render() {
    const { figurine, serie, photos } = this.state;
    return (
      <PhotoConsumer>
        {({ photo }) => (
          <div className="figurine-detail" >
            <h2>{figurine.name}&nbsp;
              <small>
                {figurine.index}&nbsp;
                {figurine.cost} <i className="fas fa-ruble-sign" />
              </small>
            </h2>
            <div className="gallery">
              <ul>
                <li>
                  <Dropbox figurineId={this.props.match.params.id} />
                </li>
                {(serie.image) ?
                  <li>
                    <Modal
                      anchor={
                        <img className="modal-anchor" src={serie.image} alt={serie.name} />
                      }
                    >
                      <div className="modal-body">
                        <img src={serie.image} alt={serie.name} />
                      </div>
                    </Modal>
                  </li>
                  : ''
                }
                {(figurine.image) ?
                  <li>
                    <Modal anchor={
                      <img
                        className="modal-anchor"
                        src={figurine.image}
                        alt={figurine.name}
                      />}
                    >
                      <div className="modal-body">
                        <img src={figurine.image} alt={figurine.name} />
                      </div>
                    </Modal>
                  </li>
                  : ''
                }
                {photos.concat(photo).map(ph => (
                  <li key={ph.id}>
                    <Modal anchor={
                      <img
                        className="modal-anchor"
                        src={ph.photo}
                        alt={figurine.name}
                      />}
                    >
                      <div className="modal-body">
                        <img src={ph.photo} alt={figurine.name} />
                      </div>
                    </Modal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </PhotoConsumer>
    );
  }
}

FigurineDetail.defaultProps = {
  match: {},
};

FigurineDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default FigurineDetail;
