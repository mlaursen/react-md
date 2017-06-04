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

const Customization = ({ match: { params: { location } }, history, location: { search } }) => {
  const tab = getTab(search);
  if (location === 'colors') {
    return <Colors />;
  } else if (location === 'themes') {
    return <Themes tab={tab} />;
  } else if (location === 'typography') {
    return <Typography />;
  } else if (location === 'media-queries') {
    return <MediaQueries />;
  } else if (location === 'minimizing-bundle') {
    return <MinimizingBundle />;
  }

  return <NotFound history={history} />;
};

Customization.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
export default Customization;
