import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileInput from './file-input';

class FormFigurine extends Component {
  constructor(props) {
    super(props);
    this.status = React.createRef();
    this.name = React.createRef();
    this.index = React.createRef();
    this.cost = React.createRef();
    this.have_image = React.createRef();
    this.inputWrapper = React.createRef();
  }

  componentDidMount() {
    this.fillInForm();
  }

  fillInForm() {
    this.status.current.checked = this.props.figurine.status;
    this.name.current.value = this.props.figurine.name;
    this.index.current.value = this.props.figurine.index;
    this.cost.current.value = this.props.figurine.cost;
    this.have_image.current.checked = this.props.figurine.have_image;
    const image = this.inputWrapper.current.querySelector('.image-cell img');
    image.src = this.props.figurine.image;
  }

  render() {
    return (
      <div className="form-figurine row">
        <div className="col-1">
          <div className="checkbox">
            <input type="checkbox" id={`${this.props.index}-status`} name={`${this.props.index}-status`} ref={this.status} />
            <label htmlFor={`${this.props.index}-status`} />
          </div>
          <span className="label">Status</span>
        </div>
        <div className="col-4">
          <input
            className="form-control"
            name={`${this.props.index}-name`}
            type="text"
            placeholder="Name"
            ref={this.name}
          />
        </div>
        <div className="col-2">
          <input
            className="form-control"
            name={`${this.props.index}-index`}
            type="number"
            placeholder="index"
            ref={this.index}
          />
        </div>
        <div className="col-1">
          <input
            className="form-control"
            name={`${this.props.index}-cost`}
            type="number"
            placeholder="Cost"
            ref={this.cost}
          />
        </div>
        <div className="col-1">
          <div className="checkbox">
            <input
              type="checkbox"
              id={`${this.props.index}-have-image`}
              name={`${this.props.index}-have-image`}
              ref={this.have_image}
            />
            <label htmlFor={`${this.props.index}-have-image`} />
          </div>
          <span className="label">Image</span>
        </div>
        <div className="col-3 file-input-wrapper" ref={this.inputWrapper} >
          <FileInput name={`${this.props.index}-image`} />
        </div>
      </div>
    );
  }
}

FormFigurine.propTypes = {
  index: PropTypes.number.isRequired,
  figurine: PropTypes.instanceOf(Object).isRequired,
};

export default FormFigurine;
