import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.shade = React.createRef();
    this.content = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.shade.current.style.height = '100vh';
    this.content.current.style.height = 'auto';
    this.shade.current.style.opacity = 0.75;
    this.content.current.style.opacity = 1;
  }

  closeModal() {
    this.shade.current.style.height = 0;
    this.content.current.style.height = 0;
    this.shade.current.style.opacity = 0;
    this.content.current.style.opacity = 0;
  }

  render() {
    return (
      <div className="modal" >
        <span
          role="button"
          onClick={() => this.openModal()}
          onKeyPress={() => this.openModal()}
          tabIndex="0"
        >
          {this.props.anchor}
        </span>
        <div
          className="modal-shade"
          role="button"
          onClick={() => this.closeModal()}
          onKeyPress={() => this.closeModal()}
          tabIndex="0"
          ref={this.shade}
        />
        <div className="modal-content" ref={this.content}>
          <button
            className="modal-close-button"
            onClick={() => this.closeModal()}
            onKeyPress={() => this.closeModal()}
          >
            <i className="fas fa-times modal-close-icon" />
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.node.isRequired,
};

export default Modal;
