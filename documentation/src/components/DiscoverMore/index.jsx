import React from 'react';
import PropTypes from 'prop-types';

import {
  WhatsNew,
  UpgradeV110,
  UpgradeV100,
  UpgradeV030,
  Showcases,
  Community,
  Contributing,
  NotFound,
} from 'routes';

const DiscoverMore = ({ match: { params: { location, version } }, history, staticContext }) => {
  if (version === 'v1.1.0') {
    return <UpgradeV110 staticContext={staticContext} />;
  } else if (version === 'v1.0.0') {
    return <UpgradeV100 staticContext={staticContext} />;
  } else if (version === 'v0.3.0') {
    return <UpgradeV030 staticContext={staticContext} />;
  } else if (location === 'whats-new') {
    return <WhatsNew staticContext={staticContext} />;
  } else if (location === 'showcases') {
    return <Showcases staticContext={staticContext} />;
  } else if (location === 'contributing') {
    return <Contributing staticContext={staticContext} />;
  } else if (location === 'community') {
    return <Community staticContext={staticContext} />;
  } else if (location === 'routing-examples') {
    return null;
  }

  return <NotFound history={history} staticContext={staticContext} />;
};

DiscoverMore.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default DiscoverMore;
