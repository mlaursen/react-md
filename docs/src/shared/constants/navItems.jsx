import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import FontIcon from 'react-md/lib/FontIcons';
import Link from 'react-router/lib/Link';
import IndexLink from 'react-router/lib/IndexLink';

import internalRoutes from './routes';
import toTitle from 'utils/StringUtils/toTitle';
import toPageTitle from 'utils/StringUtils/toPageTitle';
import flatten from 'utils/ListUtils/flatten';
import googleLogo from 'imgs/googleLogo.svg';
import reactLogo from 'imgs/reactLogo.svg';


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

  if (path === '') {
    resolvedComponent = IndexLink;
  } else if (component) {
    resolvedComponent = component;
  } else if (props.href) {
    resolvedComponent = 'a';
    if (!props.href.match(/sassdoc/)) {
      props.rel = 'noopener noreferrer';
      props.target = '_blank';
    }
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

const routes = internalRoutes.concat([{ divider: true }, {
  subheader: true,
  primaryText: 'References',
}, {
  href: 'https://facebook.github.io/react/',
  avatarProps: { src: reactLogo, alt: 'React Logo' },
  primaryText: 'React',
}, {
  href: 'https://www.google.com/design/spec/material-design/introduction.html',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Design',
}, {
  href: 'https://design.google.com/icons/',
  avatarProps: { src: googleLogo, alt: 'Google Logo', className: 'google-logo' },
  primaryText: 'Material Icons',
}, {
  href: 'http://webaim.org/resources/contrastchecker/',
  icon: 'accessibility',
  primaryText: 'Contrast Checker',
}]).map(route => mapToNavItems(route));

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
    if (to.match(/pickers|progress/)) {
      return {
        primaryText: toPageTitle(to),
        to,
      };
    }

    return { primaryText, to };
  }

  return null;
}

export const quickNavRoutes = flatten(routes.map(extractRealRoutes)).filter(r => !!r);
