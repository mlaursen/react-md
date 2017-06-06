import React from 'react';
import PropTypes from 'prop-types';
import { getTab } from 'utils/routing';

import {
  NotFound,
  Colors,
  Themes,
  Typography,
  MediaQueries,
  MinimizingBundle,
} from 'routes';

const Customization = ({
  match: { params: { location } },
  history,
  location: { search },
  staticContext,
}) => {
  const tab = getTab(search);
  if (location === 'colors') {
    return <Colors staticContext={staticContext} />;
  } else if (location === 'themes') {
    return <Themes tab={tab} staticContext={staticContext} />;
  } else if (location === 'typography') {
    return <Typography staticContext={staticContext} />;
  } else if (location === 'media-queries') {
    return <MediaQueries staticContext={staticContext} />;
  } else if (location === 'minimizing-bundle') {
    return <MinimizingBundle staticContext={staticContext} />;
  }

  return <NotFound history={history} staticContext={staticContext} />;
};

Customization.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};
export default Customization;
