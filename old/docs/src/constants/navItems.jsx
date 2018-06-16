import { flattenDeep } from 'lodash/array';

import routes from './navigationRoutes';
import googleLogo from 'imgs/googleLogo.svg';
import reactLogo from 'imgs/reactLogo.svg';
import { toTitle, toPageTitle } from 'utils/strings';

function toNavItem(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  if (typeof route === 'string') {
    return {
      key: route,
      to: `${prefix}${route}`,
      label: toTitle(route).replace(' Helper', 's'),
    };
  }

  const { divider, subheader, ...others } = route;
  if (divider) {
    return { divider, key: 'divider', ...others };
  } else if (subheader) {
    return { subheader, ...others, key: others.label };
  }

  let { to, label, routes } = others;
  if (to === '') {
    label = 'Home';
  } else {
    label = label || toTitle(to);
  }

  const key = to || label;

  if (routes) {
    const newParents = parents.length ? [...parents, to] : [to];
    routes = routes.map(r => toNavItem(r, newParents));
  }

  if (to || to === '') {
    to = `${prefix}${to}`;
  }

  return {
    ...others,
    key,
    to,
    label,
    routes,
  };
}

const allRoutes = routes.concat([{ divider: true }, {
  subheader: true,
  primaryText: 'References',
}, {
  href: 'https://facebook.github.io/react/',
  avatar: { src: reactLogo, alt: 'React Logo' },
  label: 'React',
}, {
  href: 'https://www.google.com/design/spec/material-design/introduction.html',
  avatar: { src: googleLogo, alt: 'Google Logo', className: 'md-avatar__google-logo' },
  label: 'Material Design',
}, {
  href: 'https://design.google.com/icons/',
  avatar: { src: googleLogo, alt: 'Google Logo', className: 'md-avatar__google-logo' },
  label: 'Material Icons',
}, {
  href: 'http://webaim.org/resources/contrastchecker/',
  icon: 'accessibility',
  label: 'Contrast Checker',
}]);

const navItems = allRoutes.map(route => toNavItem(route));
export default navItems;

function extractRealRoutes(route) {
  if (route.routes) {
    return route.routes.map(extractRealRoutes);
  } else if (route.to && route.to !== '/') {
    const { to, label } = route;
    if (to.match(/pickers|progress/)) {
      return { label: toPageTitle(to), to };
    }

    return { label, to };
  }

  return null;
}

export const quickNavRoutes = flattenDeep(navItems.map(extractRealRoutes)).filter(r => !!r);
