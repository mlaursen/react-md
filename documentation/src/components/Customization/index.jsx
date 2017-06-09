import React from 'react';
import PropTypes from 'prop-types';
import { getTab } from 'utils/routing';

import {
  Colors,
  Themes,
  Typography,
  MediaQueries,
  MinimizingBundle,
  SassDocPage,
  NotFound,
} from 'routes';

const COLORS = 'colors';
const THEMES = 'themes';
const TYPOGRAPHY = 'typography';
const MEDIA_QUERIES = 'media-queries';
const MINIMIZING_BUNDLE = 'minimizing-bundle';

const SASSDOC_ROUTES = [COLORS, TYPOGRAPHY, MEDIA_QUERIES];

const Customization = (props) => {
  const {
    match: { params: { location } },
    history,
    location: { search },
    staticContext,
  } = props;
  const tab = getTab(search);

  if ((tab === 2 && location === THEMES) || (tab === 1 && SASSDOC_ROUTES.indexOf(location) !== -1)) {
    return <SassDocPage {...props} key="sassdoc" />;
  }

  switch (location) {
    case COLORS:
      return <Colors tab={tab} staticContext={staticContext} />;
    case THEMES:
      return <Themes tab={tab} staticContext={staticContext} />;
    case TYPOGRAPHY:
      return <Typography tab={tab} staticContext={staticContext} />;
    case MEDIA_QUERIES:
      return <MediaQueries tab={tab} staticContext={staticContext} />;
    case MINIMIZING_BUNDLE:
      return <MinimizingBundle staticContext={staticContext} />;
    default:
      return <NotFound history={history} staticContext={staticContext} />;
  }
};

Customization.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};
export default Customization;
