import React, { PropTypes } from 'react';

import { NotFound, Colors, Themes, Typography, MediaQueries, MinimizingBundle } from 'routes';

const Customization = ({ match: { params: { location } }, history }) => {
  if (location === 'colors') {
    return <Colors />;
  } else if (location === 'themes') {
    return <Themes />;
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
};
export default Customization;
