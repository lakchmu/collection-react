/* global FileReader */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileInput extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.image = React.createRef();
    this.handleForInput = this.handleForInput.bind(this);
  }

  handleForInput() {
    const file = this.input.current.files[0];
    const reader = new FileReader();
    reader.onload = ((event) => {
      this.image.current.src = event.target.result;
    });
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="dropbox" name={this.props.name}>
        <input
          id={this.props.name}
          className={this.props.className}
          name={this.props.name}
          alt="photo figurine input"
          type="file"
          multiple
          onChange={this.handleForInput}
          ref={this.input}
          required={this.props.required}
        />
        <label htmlFor={this.props.name}>
          <span className="content-wrapper">
            <i className="far fa-image" />
            <p>Select {this.props.title}{this.props.required ? <span>*</span> : ''} here</p>
          </span>
        </label>
        <div className="image-cell">
          <span className={this.props.className ? 'invalid-feedback' : ''}>
            File not selected <br />
          </span>
          <img src="" alt="" ref={this.image} />
        </div>
      </div>
    );
  }
}

FileInput.defaultProps = {
  required: '',
  className: '',
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.string,
  className: PropTypes.string,
};

export default FileInput;
