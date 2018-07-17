/* global FormData */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import request from '../../app-lib';
import { API_METHOD_FIGURINE, API_METHOD_SERIES } from '../../constants';
import Storage from './../../storage';

import FormFigurine from './form-figurine';

class FormAddFigurine extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.infoText = React.createRef();
    this.errorText = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { figurines: [] };
    Storage
      .getFigurines([{ filter: 'series', value: `${this.props.match.params.id}` }])
      .then(figurines => this.setState({ figurines }));
  }

  handleSubmit(event) {
    event.preventDefault();
    const oData = new FormData();
    const formElements = this.form.current.elements;
    const formCount = (formElements.length - 1) / 6;
    for (let j = 0; j < formCount; j += 1) {
      oData.append(`[${j}]id`, this.state.figurines[j].id);
      oData.append(`[${j}]status`, formElements[`${j}-status`].checked);
      oData.append(`[${j}]name`, formElements[`${j}-name`].value);
      oData.append(`[${j}]index`, formElements[`${j}-index`].value);
      oData.append(`[${j}]cost`, formElements[`${j}-cost`].value);
      oData.append(`[${j}]have_image`, formElements[`${j}-have-image`].checked);
      if (formElements[`${j}-image`].files.length) {
        oData.append(`[${j}]image`, formElements[`${j}-image`].files[0]);
      }
      oData.append(`[${j}]series`, this.props.match.params.id);
    }

    const requestUrl = `${API_METHOD_SERIES}/${this.props.match.params.id}/${API_METHOD_FIGURINE}/`;
    const requestMethod = 'patch';

    request(
      requestUrl,
      { method: requestMethod, body: oData },
    )
      .then(response => response.json())
      .then(() => {
        this.errorText.current.classList.remove('show');
        const infoText = this.infoText.current;
        infoText.classList.add('show');
        setTimeout(() => infoText.classList.remove('show'), 2000);
      })
      .catch((error) => {
        console.warn(new Error(error.message));
        const errorText = this.errorText.current;
        errorText.classList.add('show');
      });
  }

  render() {
    const { figurines } = this.state;
    return (
      <form className="form-add-figurine" onSubmit={e => this.handleSubmit(e)} ref={this.form} >
        {figurines.map((figurine, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <FormFigurine index={index} key={index} figurine={figurine} />
        ))}
        <div className="submit-group">
          <input type="submit" value="Submit" />
          <span className="info-text" ref={this.infoText}>
            Changes saved
          </span>
          <span className="error-text" ref={this.errorText}>
            The server responded with an error
          </span>
        </div>
      </form>
    );
  }
}

FormAddFigurine.defaultProps = {
  match: {},
};

FormAddFigurine.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default FormAddFigurine;
