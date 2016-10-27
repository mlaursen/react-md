import App from 'containers/App';

export default {
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    if (__CLIENT__) {
      require.ensure([
          // './GettingStarted',
          // './Customization',
          // './DiscoverMore',
        './components',
          // './NotFouteRoute',
      ], require => {
        cb(null, [
            // require('./GettingStarted').default,
            // require('./Customization').default,
            // require('./DiscoverMore').default,
          require('./components').default,
            // require('./NotFoundRoute').default,
        ]);
      });
    } else {
      cb(null, [
          // require('./GettingStarted').default,
          // require('./Customization').default,
          // require('./DiscoverMore').default,
        require('./components').default,
          // require('./NotFoundRoute').default,
      ]);
    }
  },
};
