import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modal = React.createRef();
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.modal.current.classList.add('show');
  }

  closeModal() {
    this.modal.current.classList.remove('show');
  }

  render() {
    return (
      <div className="modal" ref={this.modal} >
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
        />
        <div className="modal-content">
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
