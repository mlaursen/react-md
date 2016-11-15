import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import toTitle from 'utils/StringUtils/toTitle';
import flatten from 'utils/ListUtils/flatten';
import googleLogo from '../imgs/googleLogo.svg';
import reactLogo from '../imgs/reactLogo.svg';


function mapToNavItems(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  if (typeof route === 'string') {
    return {
      component: IndexLink,
      to: `${prefix}${route}`,
      className: 'md-text-capitalize',
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
    ...props
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

  let resolvedNestedItems;
  let resolvedIcon;
  let resolvedComponent;
  if (nestedItems) {
    resolvedNestedItems = nestedItems.map(route => mapToNavItems(route, parents.length ? [...parents, path] : [path]));
  }

  if (icon) {
    resolvedIcon = <FontIcon>{icon}</FontIcon>;
  }

  if (avatarProps) {
    resolvedIcon = <Avatar {...avatarProps} className="md-avatar md-avatar--icon-sized md-avatar--svg" />;
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
    nestedItems: resolvedNestedItems,
    primaryText: primaryText || toTitle(path),
  };
}

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
    'typography',
    'minimizing-bundle',
  ],
}, {
  path: 'discover-more',
  icon: 'search',
  nestedItems: [
    'whats-new', {
      path: 'upgrade-guides',
      nestedItems: [{
        path: 'v1.0.0',
        primaryText: 'Upgrading to v1.0.0',
      }, {
        path: 'v0.3.0',
        primaryText: 'Upgrading to v0.3.0',
      }],
    }, 'community',
    'contributing',
  ],
}, {
  path: 'components',
  icon: 'build',
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
      nestedItems: [
        'accessible-fake-button',
        'collapse',
        'focus-container',
        'icon-separator',
        'portal',
      ],
    }, 'inks',
    'lists',
    'media',
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
    'sliders',
    'snackbars',
    'subheaders',
    'tabs',
    'text-fields',
    'toolbars',
    'tooltips',
  ],
}, { divider: true }, {
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
}, {
  href: 'http://webaim.org/resources/contrastchecker/',
  icon: 'accessibility',
  primaryText: 'Contrast Checker',
  target: '_blank',
}].map(route => mapToNavItems(route));

routes.unshift({
  to: '/',
  key: 'home',
  primaryText: 'Home',
  component: IndexLink,
  leftIcon: <FontIcon>home</FontIcon>,
});

function isNestedActive(nestedItems, pathname) {
  return nestedItems && nestedItems.some(({ to, nestedItems }) => to === pathname || isNestedActive(nestedItems, pathname));
}

function updateActiveRoutes(route, pathname) {
  if (route.divider || route.subheader) {
    return route;
  }

  const { to, nestedItems, ...props } = route;
  const active = to === pathname || isNestedActive(nestedItems, pathname);
  return {
    ...props,
    to,
    active,
    defaultOpen: nestedItems && active,
    nestedItems: nestedItems && nestedItems.map(route => updateActiveRoutes(route, pathname)),
  };
}

export default function getNavItems(pathname = '') {
  if (!pathname || pathname === '') {
    return routes;
  }

  return routes.map(route => updateActiveRoutes(route, pathname));
}

export const FIRST_ROUTE = 'components/autocompletes';


function extractRealRoutes(route) {
  if (route.nestedItems) {
    return route.nestedItems.map(extractRealRoutes);
  } else if (route.to && route.to !== '/') {
    const { primaryText, to } = route;

    return { primaryText, to };
  }

  return null;
}

export const quickNavRoutes = flatten(routes.map(extractRealRoutes)).filter(r => !!r);
