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
  Chips,
  DataTables,
  Dialogs,
  Dividers,
  Drawers,
  ExpansionPanels,
  FileInputs,
  FontIcons,
  AccessibleFakeButtons,
  Collapses,
  FocusContainers,
  IconSeparators,
  Layovers,
  Portals,
  Inks,
  Lists,
  Media,
  Menus,
  NavigationDrawers,
  Papers,
  DatePickers,
  TimePickers,
  CircularProgress,
  LinearProgress,
  SelectFields,
  SelectionControls,
  Checkboxes,
  Radios,
  Switches,
  Sliders,
  Snackbars,
  Subheaders,
  Tabs,
  TextFields,
  Toolbars,
  Tooltips,
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
    case 'chips':
      Component = Chips;
      break;
    case 'data-tables':
      Component = DataTables;
      break;
    case 'dialogs':
      Component = Dialogs;
      break;
    case 'dividers':
      Component = Dividers;
      break;
    case 'drawers':
      Component = Drawers;
      break;
    case 'expansion-panels':
      Component = ExpansionPanels;
      break;
    case 'file-inputs':
      Component = FileInputs;
      break;
    case 'font-icons':
      Component = FontIcons;
      break;
    case 'accessible-fake-buttons':
      Component = AccessibleFakeButtons;
      break;
    case 'collapses':
      Component = Collapses;
      break;
    case 'focus-containers':
      Component = FocusContainers;
      break;
    case 'icon-separators':
      Component = IconSeparators;
      break;
    case 'layovers':
      Component = Layovers;
      break;
    case 'portals':
      Component = Portals;
      break;
    case 'inks':
      Component = Inks;
      break;
    case 'lists':
      Component = Lists;
      break;
    case 'media':
      Component = Media;
      break;
    case 'menus':
      Component = Menus;
      break;
    case 'navigation-drawers':
      Component = NavigationDrawers;
      break;
    case 'papers':
      Component = Papers;
      break;
    case 'date':
      Component = DatePickers;
      break;
    case 'time':
      Component = TimePickers;
      break;
    case 'circular':
      Component = CircularProgress;
      break;
    case 'linear':
      Component = LinearProgress;
      break;
    case 'select-fields':
      Component = SelectFields;
      break;
    case 'selection-controls':
      Component = SelectionControls;
      break;
    case 'checkboxes':
      Component = Checkboxes;
      break;
    case 'radios':
      Component = Radios;
      break;
    case 'switches':
      Component = Switches;
      break;
    case 'sliders':
      Component = Sliders;
      break;
    case 'snackbars':
      Component = Snackbars;
      break;
    case 'subheaders':
      Component = Subheaders;
      break;
    case 'tabs':
      Component = Tabs;
      break;
    case 'text-fields':
      Component = TextFields;
      break;
    case 'toolbars':
      Component = Toolbars;
      break;
    case 'tooltips':
      Component = Tooltips;
      break;
    default:
      Component = null;
  }

  if (Component) {
    return <Component key={pathname} {...props} />;
  }

  return <NotFound history={history} staticContext={staticContext} />;
};

Components.propTypes = {
  staticContext: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Components;
