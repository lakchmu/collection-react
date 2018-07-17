import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Storage from './../storage';
import Modal from './modal';
import Dropbox from './form/dropbox';
import { PhotoConsumer } from '../context/photo';

class FigurineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { figurine: {}, serie: {}, photos: [] };
    Storage.getFigurine(this.props.match.params.id)
      .then(figurine => this.setState({ figurine }))
      .then(() => Storage.getSerie(this.state.figurine.series)
        .then(serie => this.setState({ serie })));
    Storage.getPhotoFigurine(this.props.match.params.id).then(photos => this.setState({ photos }));
  }

  render() {
    const { figurine, serie, photos } = this.state;
    return (
      <PhotoConsumer>
        {({ photo }) => (
          <div className="figurine-detail" >
            <h1>{figurine.name}&nbsp;
              <small>
                {figurine.index}&nbsp;
                {figurine.cost} <i className="fas fa-ruble-sign" />
              </small>
            </h1>
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
