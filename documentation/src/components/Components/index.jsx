import React from 'react';
import PropTypes from 'prop-types';
import { componentRoutes } from 'constants/navigationRoutes';

const { components, sections } = componentRoutes.reduce((map, route) => {
  if (typeof route === 'string') {
    map.components.push(route);
  } else {
    map.sections.push(route.to);
    map.components = map.components.concat(route.routes); // eslint-disable-line no-param-reassign
  }

  return map;
}, { components: [], sections: [] });

import { NotFound, ExamplesPage } from 'routes';

const Components = (props) => {
  const { match: { params: { section, component } }, history, staticContext } = props;
  if (components.indexOf(component) === -1 || (section && sections.indexOf(section) === -1)) {
    return <NotFound history={history} staticContext={staticContext} />;
  }

  return <ExamplesPage {...props} />;
};

Components.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Components;
