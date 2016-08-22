import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';

const Root = (({ store, ...props }) => (
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>
));

Root.propTypes = {
  store: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
};

export default Root;
