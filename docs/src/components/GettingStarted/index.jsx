import React from 'react';
import PropTypes from 'prop-types';

import { NotFound } from 'routes';
import Prerequisites from './Prerequisites';
import Installation from './Installation';

const GettingStarted = ({ match: { params: { location } }, history, staticContext }) => {
  if (location === 'prerequisites') {
    return <Prerequisites />;
  } else if (location === 'installation') {
    return <Installation />;
  }

  return <NotFound history={history} staticContext={staticContext} />;
};

GettingStarted.propTypes = {
  staticContext: PropTypes.object,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default GettingStarted;
