import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  render() {
    return (
      <div className="content">
        {this.props.children}
      </div>
    );
  }
}

Content.defaultProps = {
  children: <li />,
};

Content.propTypes = {
  children: PropTypes.element,
};

export default Content;
