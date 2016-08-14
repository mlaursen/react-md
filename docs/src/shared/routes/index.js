import App from 'containers/App';

export default {
  path: '/',
  component: App,
  getIndexRoute(location, cb) {
    require.ensure([], require => {
      cb(null, {
        component: require('containers/Home').default,
      });
    });
  },
  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [
        require('./GettingStarted').default,
        require('./Customization').default,
        require('./DiscoverMore').default,
        require('./Components').default,
        require('./NotFoundRoute').default,
      ]);
    });
  },
};
