import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from './../app-lib';
import { API_METHOD_FIGURINE, API_METHOD_SERIES, API_METHOD_PHOTO_FIGURINE } from './../constants';

class FigurineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { figurine: {}, serie: {}, photos: [] };
    getJson(`${API_METHOD_FIGURINE}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ figurine: response.results[0] }));
    getJson(`${API_METHOD_SERIES}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ serie: response.results[0] }));
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
    const imageList = photos.map(photo => (
      <li key={photo.id}>
        <a href="./#">
          <img src={photo.photo} alt={figurine.name} />
        </a>
      </li>
    ));
    console.warn(photos);
    return (
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
              <a href="./#">
                <img src={serie.image} alt={serie.name} />
              </a>
            </li>
            <li>
              <a href="./#">
                <img src={figurine.image} alt={figurine.name} />
              </a>
            </li>
            {imageList}
          </ul>
        </div>
      </div>
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
