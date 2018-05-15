import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getJson } from './../app-lib';
import { API_METHOD_FIGURINE } from './../constants';

class FigurineDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { figurine: {} };
    getJson(`${API_METHOD_FIGURINE}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ figurine: response.results[0] }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getSeries();
    }
  }

  getSeries() {
    getJson(`${API_METHOD_FIGURINE}?id=${this.props.match.params.id}`)
      .then(response => this.setState({ figurine: response.results[0] }));
  }

  render() {
    const { figurine } = this.state;
    return (
      <div className="figurine-detail" >
        {figurine.name}
      </div>
    );
  }
}

FigurineDetail.defaultProps = {
  match: {},
};

FigurineDetail.propTypes = {
  match: PropTypes.instanceOf(Object),
};

export default FigurineDetail;
