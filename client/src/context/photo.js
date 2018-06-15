import React from 'react';
import createReactContext from 'create-react-context';
import PropTypes from 'prop-types';

const PhotoContext = createReactContext({
  photo: [],
  changePhoto: () => null,
});

export const PhotoConsumer = PhotoContext.Consumer;
export class PhotoProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: [],
    };
    this.changePhoto = this.changePhoto.bind(this);
  }

  changePhoto(photo) {
    this.setState({ photo });
  }

  render() {
    return (
      <PhotoContext.Provider
        value={
          {
            photo: this.state.photo,
            changePhoto: this.changePhoto,
          }
        }
      >
        {this.props.children}
      </PhotoContext.Provider>
    );
  }
}

PhotoProvider.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
