/* global window */

import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <button className="button button-reverse" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-circle-left" />
          Go back
        </button>
      </div>
    );
  }
}

export default Footer;
