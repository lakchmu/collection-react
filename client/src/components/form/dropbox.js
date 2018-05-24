/* global FormData, FileReader */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../app-lib';
import { API_METHOD_PHOTO_FIGURINE } from '../../constants';
import { PhotoConsumer } from '../../context/photo';

class Dropbox extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.handleForInput = this.handleForInput.bind(this);
  }

  handleForInput(photo, changeFunction) {
    const oData = new FormData();
    const { files } = this.input.current;
    const newPhotos = {};
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      oData.append(`[${index}]photo`, file);
      oData.append(`[${index}]figurine`, this.props.figurineId);
      reader.onload = ((event) => {
        const data = event.target.result;
        const newPhoto = { figurine: this.props.figurineId, id: 'Nan', photo: data };
        newPhotos[index] = newPhoto;
        photo.push(newPhoto);
        changeFunction(photo);
      });
      reader.readAsDataURL(file);
    });


    request(`${API_METHOD_PHOTO_FIGURINE}/`, { method: 'post', body: oData })
      .then(response => response.json())
      .then((response) => {
        response.reverse().forEach((item, index) => {
          newPhotos[index].id = item.id;
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  render() {
    return (
      <PhotoConsumer>
        {({ photo, changePhoto }) => (
          <form className="dropbox" encType="multipart/form-data" method="post">
            <input
              id="dropbox"
              name="dropbox"
              alt="photo figurine input"
              type="file"
              multiple
              onChange={() => { this.handleForInput(photo, changePhoto); }}
              ref={this.input}
            />
            <label htmlFor="dropbox">
              <span className="content-wrapper">
                <i className="far fa-image" />
                <p>Drop files here</p>
              </span>
            </label>
          </form>
        )}
      </PhotoConsumer>
    );
  }
}

Dropbox.propTypes = {
  figurineId: PropTypes.string.isRequired,
};

export default Dropbox;
