import App from 'containers/App';

export default {
  path: '/',
  component: App,
  getIndexRoute(location, cb) {
    if (__CLIENT__) {
      require.ensure(['containers/Home'], require => {
        cb(null, { component: require('containers/Home').default });
      });
    } else {
      cb(null, { component: require('containers/Home').default });
    }
  },
  getChildRoutes(location, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, [
          require('./gettingStarted').default,
          require('./customization').default,
          require('./discoverMore').default,
          require('./components').default,
            // require('./NotFoundRoute').default,
        ]);
      });
    } else {
      cb(null, [
        require('./gettingStarted').default,
        require('./customization').default,
        require('./discoverMore').default,
        require('./components').default,
          // require('./NotFoundRoute').default,
      ]);
    }
  },
};
