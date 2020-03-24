import { flattenDeep } from 'lodash/array';
import { ROOT_PATH } from 'constants/application';
import definedRoutes, {
  componentRoutes as definedComponentRoutes,
} from 'constants/navigationRoutes';

function extractRealRoute(route, parents = []) {
  const prefix = `${ROOT_PATH}${parents.join('/')}${parents.length ? '/' : ''}`;
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
routes.push(ROOT_PATH);
// add redirects
routes.push(
  `${ROOT_PATH}getting-started`,
  `${ROOT_PATH}customization`,
  `${ROOT_PATH}discover-more`,
  `${ROOT_PATH}components`,
);

export default routes;
