import React, { PropTypes } from 'react';

import { NotFound, Prerequisites, Installation } from 'routes';

const GettingStarted = ({ match: { params: { location } }, history }) => {
  if (location === 'prerequisites') {
    return <Prerequisites />;
  } else if (location === 'installation') {
    return <Installation />;
  }

  return <NotFound history={history} />;
};

GettingStarted.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default GettingStarted;
