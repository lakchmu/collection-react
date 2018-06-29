import React from 'react';
import createReactContext from 'create-react-context';
import PropTypes from 'prop-types';

const PaginationDataContext = createReactContext({
  paginationData: [],
  changePaginationData: () => null,
});

export const PaginationDataConsumer = PaginationDataContext.Consumer;
export class PaginationDataProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationData: [],
    };
    this.changePaginationData = this.changePaginationData.bind(this);
  }

  changePaginationData(paginationData) {
    this.setState({ paginationData });
  }

  render() {
    return (
      <PaginationDataContext.Provider
        value={
          {
            paginationData: this.state.paginationData,
            changePaginationData: this.changePaginationData,
          }
        }
      >
        {this.props.children}
      </PaginationDataContext.Provider>
    );
  }
}

PaginationDataProvider.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
