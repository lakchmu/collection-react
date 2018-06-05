import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormMetaFigurine extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.index = React.createRef();
  }

  componentDidMount() {
    this.fillInForm();
  }

  fillInForm() {
    this.name.current.value = this.props.name;
    this.index.current.value = this.props.index;
  }

  render() {
    return (
      <div className="meta-figurine-form row">
        <div className="col-75">
          <input
            className="form-control"
            name="name"
            type="text"
            placeholder="Figurine Name"
            ref={this.name}
            required
          />
          <div className="invalid-feedback" />
        </div>
        <div className="col-25">
          <div className="row">
            <div className="col-75">
              <input
                name="index"
                type="text"
                placeholder="Index"
                ref={this.index}
              />
            </div>
            <div className="col-25">
              <button className="fas fa-times" onClick={this.props.onClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FormMetaFigurine.defaultProps = {
  name: '',
  index: '',
};

FormMetaFigurine.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string,
  index: PropTypes.string,
};

export default FormMetaFigurine;
