import React from 'react';
import PropTypes from 'prop-types';

import { NotFound } from 'routes';

const DiscoverMore = ({ match: { params: { location, version } }, history }) => {
  if (version === 'v1.1.0') {
    return <h1>Version 1.1.0</h1>;
  } else if (version === 'v1.0.0') {
    return <h1>Version 1.0.0</h1>;
  } else if (version === 'v0.3.0') {
    return <h1>Version 0.3.0</h1>;
  } else if (location === 'whats-new') {
    return null;
  }

  return <NotFound history={history} />;
};

DiscoverMore.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default DiscoverMore;
