/* global FormData, window, document */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import request, { getJson } from '../../app-lib';
import { API_METHOD_FEATURES, API_METHOD_SERIES } from '../../constants';
import FileInput from './file-input';
import FormMetaFigurine from './form-metafigurine';

class FormSerie extends Component {
  static validate(form) {
    Array.from(form.elements).forEach((elem) => {
      const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
      if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
        elem.classList.add((!elem.validity.valid) ? 'invalid' : 'valid');
        elem.classList.remove((elem.validity.valid) ? 'invalid' : 'valid');
        errorLabel.textContent = (!elem.validity.valid) ? elem.validationMessage : '';
      }
    });
    return form.checkValidity();
  }

  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.formMF = React.createRef();
    this.infoText = React.createRef();
    this.errorText = React.createRef();
    this.submit = this.submit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.headerAddMFigurine = this.headerAddMFigurine.bind(this);
    this.state = {
      features: [],
      serie: { figurines: [] },
      isValidated: false,
      action: 'none',
    };
    getJson(API_METHOD_FEATURES)
      .then(response => this.setState({ features: response.results }));
    if (this.props.match.params.id) {
      this.getSeries();
    }
  }

  componentDidUpdate() {
    if (this.state.action === 'add-meta-figurine-form') {
      window.scroll({ top: document.body.clientHeight, left: 0, behavior: 'smooth' });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ action: 'none' });
    }
  }

  getSeries() {
    getJson(`${API_METHOD_SERIES}?id=${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ serie: response.results[0] });
        this.fillInForm();
      });
  }

  fillInForm() {
    const form = this.form.current;
    const { serie } = this.state;
    const image = form.querySelector('.dropbox[name="image"] .image-cell img');
    const photo = form.querySelector('.dropbox[name="photo"] .image-cell img');

    image.src = serie.image;
    photo.src = serie.photo;
    form.name.value = serie.name;
    form.year.value = serie.year;
    form.link_to_fk.value = serie.link_to_fk;
    form.stars.value = serie.stars;
    form.company.value = serie.company;
    form.made_in.value = serie.made_in;
    form.status.value = serie.status;
    form.type.value = serie.type;
    if (serie.show_on_the_home) {
      form.show_on_the_home.checked = 'checked';
    }
    if (serie.full) {
      form.full.checked = 'checked';
    }
  }

  submit() {
    const oData = new FormData(this.form.current);
    const formElements = Array.from(this.formMF.current.elements);
    oData.set('full', this.form.current.full.checked);
    oData.set('show_on_the_home', this.form.current.show_on_the_home.checked);
    for (let i = 0, j = 0; i < formElements.length; i += 3, j += 1) {
      const del = this.state.serie.figurines[j].delete;
      if (del !== true) {
        oData.append(`figurines[${j}]id`, this.state.serie.figurines[j].id);
        oData.append(`figurines[${j}]name`, formElements[i].value);
        oData.append(`figurines[${j}]index`, formElements[i + 1].value);
      }
    }

    let requestUrl = `${API_METHOD_SERIES}/`; // Create new serie
    let requestMethod = 'post';

    if (this.props.match.params.id) { // Edit serie
      requestUrl = `${requestUrl}${this.props.match.params.id}/`;
      requestMethod = 'patch';

      if (!this.form.current.image.files.length) {
        oData.delete('image');
      }
      if (!this.form.current.photo.files.length) {
        oData.delete('photo');
      }
    } else {
      for (let i = 0, j = 0; i < formElements.length; i += 3, j += 1) {
        const del = this.state.serie.figurines[j].delete;
        if (del !== true) {
          oData.append(`figurines[${j}]series`, '');
        }
      }
    }

    request(
      requestUrl,
      { method: requestMethod, body: oData },
    )
      .then(response => response.json())
      .then((serie) => {
        const newSerie = this.state.serie;
        newSerie.figurines = [];
        this.setState({ serie: newSerie });
        serie.figurines.forEach((item, index) => {
          newSerie.figurines[index] = item;
        });
        this.setState({ serie: newSerie });
      })
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

  handleSubmit(event) {
    event.preventDefault();
    const serieFormValid = FormSerie.validate(this.form.current);
    const mFigurineFormValid = FormSerie.validate(this.formMF.current);
    if (serieFormValid && mFigurineFormValid) {
      console.warn('forms valid');
      this.submit();
    }
    this.setState({ isValidated: true });
  }

  headerAddMFigurine() {
    const newSerie = this.state.serie;
    newSerie.figurines.push({ id: '', name: '', index: '' });
    this.setState({ serie: newSerie, action: 'add-meta-figurine-form' });
  }

  handlerDeleteMFigurine(event, index) {
    event.preventDefault();
    event.target.classList.toggle('fa-times');
    event.target.classList.toggle('fa-undo');
    const formLine = event.target.closest('.meta-figurine-form');
    formLine.querySelectorAll('input')
      .forEach((input) => {
        if (input.hasAttribute('disabled')) {
          input.removeAttribute('disabled');
        } else {
          input.setAttribute('disabled', 'disabled');
        }
      });
    formLine.classList.toggle('disabled');
    const newSerie = this.state.serie;
    const del = newSerie.figurines[index].delete;
    newSerie.figurines[index].delete = (del) ? !del : true;
    this.setState({ serie: newSerie });
  }

  render() {
    const { features, serie } = this.state;
    const className = this.state.isValidated ? 'was-validated' : '';
    const width = (window.innerWidth >= 978) ? '100%' : `${(window.innerWidth - 10)}px`;
    return (
      <div className="form-serie">
        <h2>{this.props.header}</h2>
        <form
          className={className}
          ref={this.form}
          onSubmit={event => this.handleSubmit(event)}
          noValidate
        >
          <div className="form-group">
            <label htmlFor="serie-title">Serie title <span>*</span></label>
            <input
              id="serie-title"
              className="form-control"
              name="name"
              type="text"
              required
            />
            <div className="invalid-feedback" />
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Serie year <span>*</span></label>
            <input
              id="serie-year"
              className="form-control"
              name="year"
              type="number"
              required
            />
            <div className="invalid-feedback" />
          </div>
          <div className="form-group">
            <label htmlFor="serie-title">Link to FK</label>
            <input
              id="serie-title"
              name="link_to_fk"
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Stars</label>
            <input
              id="serie-year"
              name="stars"
              type="number"
              min="0"
              max="5"
            />
          </div>
          <FileInput name="image" title="image" />
          <FileInput
            name="photo"
            title="photo"
            className="form-control"
            required={(this.props.header === 'New serie') ? 'required' : ''}
          />
          <div className="form-group">
            <label htmlFor="serie-year">Producer</label>
            <select name="company">
              <option value="kinder">Kinder</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Made in</label>
            <select name="made_in">
              <option value="Russia">Russia</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Europe">Europe</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Status</label>
            <select name="status">
              <option value="bought">Bought</option>
              <option value="not_bought">Not Bought</option>
              <option value="want">Want</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Type</label>
            <select name="type">
              <option value="sectional">Sectional</option>
              <option value="molded">Molded</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serie-year">Features</label>
            <Select2
              className="select"
              multiple
              value={serie.feature}
              data={features.map(feature => ({ id: feature.id, text: feature.title }))}
              options={
                {
                  placeholder: 'Select features',
                  allowClear: true,
                }
              }
              style={{ width }}
            />
          </div>
          <div className="form-group">
            <div className="checkbox">
              <input type="checkbox" id="full" name="full" />
              <label htmlFor="full" />
            </div>
            <span className="label" htmlFor="serie-year">Finished</span>
            <div className="checkbox">
              <input type="checkbox" id="show_on_the_home" name="show_on_the_home" />
              <label htmlFor="show_on_the_home" />
            </div>
            <span className="label" htmlFor="serie-year">Show on home</span>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" />
            <span className="info-text" ref={this.infoText}>
              {this.props.match.params.id ? 'Changes saved' : 'New series created'}
            </span>
            <span className="error-text" ref={this.errorText}>
              The server responded with an error
            </span>
          </div>
        </form>
        <h2>Meta Figurines</h2>
        <form noValidate className={`${className}`} ref={this.formMF}>
          {serie.figurines.map((figurine, index) => (
            <FormMetaFigurine
              name={figurine.name}
              index={figurine.index}
              onClick={e => this.handlerDeleteMFigurine(e, index)}
              // eslint-disable-next-line react/no-array-index-key
              key={`${index}`}
            />
          ))
          }
        </form>
        <button className="button" onClick={this.headerAddMFigurine}>
          + Meta Figurine
        </button>
      </div>
    );
  }
}

FormSerie.defaultProps = {
  match: {},
};

FormSerie.propTypes = {
  header: PropTypes.string.isRequired,
  match: PropTypes.instanceOf(Object),
};

export default FormSerie;
