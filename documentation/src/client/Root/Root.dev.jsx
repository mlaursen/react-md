import React, { PureComponent, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

export default class Root extends PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { store, ...props } = this.props;
    return (
      <Provider store={store}>
        <Router {...props} />
      </Provider>
    );
  }
}
