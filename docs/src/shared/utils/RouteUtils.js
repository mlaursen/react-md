import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import { Link, IndexLink } from 'react-router';
import { toTitle, toPropTypeId, getIdsForRoute } from 'utils/StringUtils';
import { flatten } from 'utils/ListUtils';

import googleLogo from '../imgs/googleLogo.svg';
import reactLogo from '../imgs/reactLogo.svg';

function mapToNavItems(route, parents = []) {
  const prefix = (parents.length ? '/' + parents.join('/') : '') + '/';
  if (typeof route === 'string') {
    return {
      component: Link,
      to: `${prefix}${route}`,
      primaryText: toTitle(route).replace(' Helper', 's'),
    };
  }

  const {
    divider,
    subheader,
    path,
    primaryText,
    icon,
    avatarProps,
    nestedItems,
    component,
    ...props,
  } = route;

  if (divider) {
    return { divider, ...props };
  } else if (subheader) {
    return {
      primaryText,
      subheader,
      ...props,
    };
  }

  let resolvedNestedItems, resolvedIcon, resolvedAvatar, resolvedComponent;
  if (nestedItems) {
    resolvedNestedItems = nestedItems.map(route => mapToNavItems(route, parents.length ? [...parents, path] : [path]));
  }

  if (icon) {
    resolvedIcon = <FontIcon>{icon}</FontIcon>;
  }

  if (avatarProps) {
    resolvedAvatar = <Avatar {...avatarProps} iconSized />;
  }

  if (component) {
    resolvedComponent = component;
  } else if (props.href) {
    resolvedComponent = 'a';
  } else if (!nestedItems) {
    resolvedComponent = Link;
  }

  let to;
  if (typeof path !== 'undefined' && !nestedItems) {
    to = `${prefix}${path}`;
  }

  return {
    ...props,
    to,
    component: resolvedComponent,
    leftIcon: resolvedIcon,
    leftAvatar: resolvedAvatar,
    nestedItems: resolvedNestedItems,
    primaryText: primaryText || toTitle(path),
  };
}

const components = {
  icon: 'build',
  path: 'components',
  nestedItems: [
    'autocompletes',
    'avatars',
    'bottom-navigations',
    'buttons',
    'cards',
    'chips',
    'data-tables',
    'dialogs',
    'dividers',
    'drawers',
    'expansion-panels',
    'file-inputs',
    'font-icons', {
      path: 'helpers',
      nestedItems: ['accessible-fake-button', 'focus-container', 'icon-separator'],
    }, 'lists',
    'inks',
    'menus',
    'navigation-drawers',
    'papers', {
      path: 'pickers',
      nestedItems: ['date', 'time'],
    }, {
      path: 'progress',
      nestedItems: ['circular', 'linear'],
    }, 'select-fields', {
      path: 'selection-controls',
      nestedItems: ['selection-control', 'checkboxes', 'radios', 'switches'],
    },
    'sidebars',
    'sliders',
    'snackbars',
    'subheaders',
    'tabs',
    'text-fields',
    'toolbars',
    'tooltips',
  ],
};

const routes = [{
  path: 'getting-started',
  icon: 'info_outline',
  nestedItems: ['prerequisites', 'installation'],
}, {
  path: 'customization',
  icon: 'color_lens',
  nestedItems: [
    'colors',
    'themes',
    'media-queries',
    'grids',
    'typography', {
      href: '/sassdoc',
      primaryText: 'SASS Doc',
    },
  ],
}, {
  path: 'discover-more',
  icon: 'search',
  nestedItems: ['upgrade-guide', 'community', 'contributing'],
}, components, { divider: true }, {
  subheader: true,
  primaryText: 'References',
}, {
  href: 'https://facebook.github.io/react/',
  avatarProps: { src: reactLogo, alt: 'React Logo' },
  primaryText: 'React',
  target: '_blank',
}, {
  href: 'https://www.google.com/design/spec/material-design/introduction.html',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Design',
  target: '_blank',
}, {
  href: 'https://design.google.com/icons/',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Icons',
  target: '_blank',
}].map(route => mapToNavItems(route));

routes.unshift({
  to: '/',
  key: 'home',
  primaryText: 'Home',
  component: IndexLink,
  leftIcon: <FontIcon>home</FontIcon>,
});

export default routes;

export { routes };
export const FIRST_COMPONENT_LINK = `components/${components.nestedItems[0]}`;

/**
 * Checks if any of the nested items are currently active.
 *
 * @param {array} nestedItems the nested items to compare
 * @param {string} pathname the current pathname to compare to
 * @return true if one of the nested items are active.
 */
function isNestedItemActive(nestedItems, pathname) {
  if (!nestedItems) { return false; }

  return nestedItems.some(({ to, nestedItems }) => isNestedItemActive(nestedItems, pathname) || to === pathname);
}

/**
 * Checks if a given route is active by comparing to the given pathname.
 * A route is active if one of the nested items are equal to the pathname
 * or the current route equals the pathname.
 *
 * @param {Object} route the current route properties to check against
 * @param {string} pathname the current pathname to compare against.
 * @return a route poperties object
 */
function updateActiveRoutes(route, pathname) {
  if (route.divider || route.subheader) {
    return route;
  }

  const { to, nestedItems, ...props } = route;
  const isActive = to === pathname || isNestedItemActive(nestedItems, pathname);
  return {
    ...props,
    to,
    defaultOpen: nestedItems && isActive,
    nestedItems: nestedItems && nestedItems.map(route => updateActiveRoutes(route, pathname)),
    active: isActive,
  };
}

/**
 * Gets all the routes as navigation items. This will be all the routes
 * with the correct component and any additional props needed to display
 * in the navigation drawer.
 *
 * It will also update the active className and if the item is currently
 * open if it contains nested items.
 *
 * @param {string} pathname? the pathname to compare against. Defaults to
 *    the empty string if omitted.
 * @return an array or ListItem props for the Navigation Drawer.
 */
export function getNavItems(pathname = '') {
  return !pathname || pathname === '' ? routes : routes.map(route => updateActiveRoutes(route, pathname));
}

function extractRealRoutes(route) {
  if (route.nestedItems) {
    return route.nestedItems.map(extractRealRoutes);
  } else if (route.to && route.to !== '/') {
    let primaryText = route.primaryText;
    if (route.to.indexOf('components') !== -1) {
      primaryText = toTitle(toPropTypeId(route.to)).replace(' Helper', '');
    }

    return {
      primaryText,
      to: route.to,
    };
  } else {
    return null;
  }
}

export const quickNavRoutes = flatten(routes.map(extractRealRoutes)).filter(r => !!r);


function getComponentSearchObjects(route) {
  return getIdsForRoute(route).map(id => {
    return {
      key: id,
      component: Link,
      to: {
        pathname: route.to,
        hash: '#prop-types-' + id,
      },
      primaryText: toTitle(id).replace(/ /g, '') + ' - PropTypes',
    };
  }).concat([Object.assign({}, route, {
    key: route.key || `full-page-${route.to}`,
    primaryText: toTitle(toPropTypeId(route.to)) + ' - Examples',
    component: Link,
  })]);
}

function getSearchObjects(route, objects = []) {
  if (route.nestedItems) {
    objects = flatten(route.nestedItems.map(route => getSearchObjects(route)));
  } else if (route.to && route.to.indexOf('components') !== -1) {
    objects = objects.concat(getComponentSearchObjects(route));
  }

  return objects;
}
export const fuseRoutes = routes.reduce((searchables, route) => {
  if (route.primaryText === 'Components') {
    route.nestedItems.forEach(route => {
      getSearchObjects(route).forEach(so => {
        searchables.push(so);
      });
    });
  } else if (route.nestedItems) {
    route.nestedItems.forEach(route => {
      searchables.push(Object.assign({}, route, { key: route.to }));
    });
  }

  return searchables;
}, []);


/**
 * This function is called any time the browser's url changes. Currently
 * it just scrolls to the top of the page or to a given hash after the
 * page finishes animating.
 */
export function onUpdate() {
  const { hash } = window.location;
  const selector = document.querySelector('.md-navigation-drawer-content');
  if (hash) {
    setTimeout(() => {
      const el = document.getElementById(hash.replace('#', ''));
      let position = 0;
      if (el) {
        position = el.offsetTop;
      }

      selector.scrollTop = position;
    }, 300);
  } else {
    selector.scrollTop = 0;
  }
}
