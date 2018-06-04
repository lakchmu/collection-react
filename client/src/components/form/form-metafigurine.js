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
      <div className="row">
        <div className="col-75">
          <input
            name="name"
            type="text"
            placeholder="Figurine Name"
            ref={this.name}
            onKeyUp={this.props.onKeyUp}
          />
        </div>
        <div className="col-25">
          <input
            name="index"
            type="text"
            placeholder="Index"
            ref={this.index}
            onKeyUp={this.props.onKeyUp}
          />
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
  name: PropTypes.string,
  index: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired,
};

export default FormMetaFigurine;
