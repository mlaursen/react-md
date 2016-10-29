import App from 'containers/App';

export default {
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    if (__CLIENT__) {
      require.ensure([
        './gettingStarted',
        './customization',
          // './DiscoverMore',
        './components',
          // './NotFouteRoute',
      ], require => {
        cb(null, [
          require('./gettingStarted').default,
          require('./customization').default,
            // require('./DiscoverMore').default,
          require('./components').default,
            // require('./NotFoundRoute').default,
        ]);
      });
    } else {
      cb(null, [
        require('./gettingStarted').default,
        require('./customization').default,
          // require('./DiscoverMore').default,
        require('./components').default,
          // require('./NotFoundRoute').default,
      ]);
    }
  },
};
