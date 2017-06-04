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

const DiscoverMore = ({ match: { params: { location, version } }, history }) => {
  if (version === 'v1.1.0') {
    return <UpgradeV110 />;
  } else if (version === 'v1.0.0') {
    return <UpgradeV100 />;
  } else if (version === 'v0.3.0') {
    return <UpgradeV030 />;
  } else if (location === 'whats-new') {
    return <WhatsNew />;
  } else if (location === 'showcases') {
    return <Showcases />;
  } else if (location === 'contributing') {
    return <Contributing />;
  } else if (location === 'community') {
    return <Community />;
  }

  return <NotFound history={history} />;
};

DiscoverMore.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default DiscoverMore;
