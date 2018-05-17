/* global FormData */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../app-lib';
import { API_METHOD_PHOTO_FIGURINE } from '../../constants';

class Dropbox extends Component {
  constructor(props) {
    super(props);
    console.warn(this.props.figurineId);
    this.input = React.createRef();
    this.handleForInput = this.handleForInput.bind(this);
  }

  handleForInput() {
    const oData = new FormData();
    const { files } = this.input.current;

    Array.from(files).forEach((file) => {
      oData.append('photo', file);
    });

    oData.append('figurine', this.props.figurineId);

    request(`${API_METHOD_PHOTO_FIGURINE}/`, { method: 'post', body: oData })
      .then(response => console.warn(response))
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  render() {
    return (
      <form className="dropbox" encType="multipart/form-data" method="post">
        <input
          id="dropbox"
          name="dropbox"
          alt="photo figurine input"
          type="file"
          multiple
          onChange={this.handleForInput}
          ref={this.input}
        />
        <label htmlFor="dropbox">
          <span className="content-wrapper">
            <i className="far fa-image" />
            <p>Drop files here</p>
          </span>
        </label>
      </form>
    );
  }
}

Dropbox.propTypes = {
  figurineId: PropTypes.string.isRequired,
};

export default Dropbox;
