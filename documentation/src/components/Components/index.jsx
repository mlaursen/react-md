import React from 'react';
import PropTypes from 'prop-types';
import { componentRoutes } from 'constants/navigationRoutes';
import { getTab } from 'utils/routing';

const { components, sections } = componentRoutes.reduce((map, route) => {
  if (typeof route === 'string') {
    map.components.push(route);
  } else {
    map.sections.push(route.to);
    map.components = map.components.concat(route.routes); // eslint-disable-line no-param-reassign
  }

  return map;
}, { components: [], sections: [] });

import {
  Autocompletes,
  Avatars,
  Badges,
  BottomNavigations,
  Buttons,
  Cards,
  PropTypesPage,
  SassDocPage,
  NotFound,
} from 'routes';

const Components = (props) => {
  const {
    match: {
      params: { section, component },
    },
    history,
    location: { search, pathname },
    staticContext,
  } = props;

  const tab = getTab(search);
  if (components.indexOf(component) === -1 || (section && sections.indexOf(section) === -1)) {
    return <NotFound history={history} staticContext={staticContext} />;
  } else if (tab === 1) {
    return <PropTypesPage key="prop-types" {...props} />;
  } else if (tab === 2 && !component.match(/accessible|collapse|focus-container|icon-container|portal/)) {
    return <SassDocPage key="sassdoc" {...props} />;
  }

  let Component;
  switch (component) {
    case 'autocompletes':
      Component = Autocompletes;
      break;
    case 'avatars':
      Component = Avatars;
      break;
    case 'badges':
      Component = Badges;
      break;
    case 'bottom-navigations':
      Component = BottomNavigations;
      break;
    case 'buttons':
      Component = Buttons;
      break;
    case 'cards':
      Component = Cards;
      break;
    default:
      Component = null;
  }

  if (Component) {
    return <Component key={pathname} {...props} />;
  }

  return null;
};

Components.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Components;
