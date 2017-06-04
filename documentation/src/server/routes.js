import { quickNavRoutes } from 'constants/navItems';

const routes = quickNavRoutes.map(({ to }) => to);
routes.unshift('/');

// add redirects
routes.push(
  '/getting-started',
  '/customization',
  '/discover-more',
  '/components',
);

export default routes;
