import { flattenDeep } from 'lodash/array';
import definedRoutes, {
  componentRoutes as definedComponentRoutes,
} from 'constants/navigationRoutes';

function extractRealRoute(route, parents = []) {
  const prefix = `${parents.length ? '/' : ''}${parents.join('/')}/`;
  if (typeof route === 'string') {
    return `${prefix}${route}`;
  }
  const { routes, to } = route;

  if (routes) {
    const newParents = parents.length ? [...parents, to] : [to];
    return routes.map(route => extractRealRoute(route, newParents));
  }

  return to;
}

export const baseRoutes = flattenDeep(definedRoutes.map(route => extractRealRoute(route))).filter(r => !!r);
export const componentRoutes = flattenDeep(definedComponentRoutes.map(route => extractRealRoute(route, ['components']))).filter(r => !!r);


const routes = baseRoutes.slice();
routes.push('/');
// add redirects
routes.push(
  '/getting-started',
  '/customization',
  '/discover-more',
  '/components',
);

export default routes;
