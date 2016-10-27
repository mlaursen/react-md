export default {
  path: 'components',
  indexRoute: {
    onEnter(state, replace) {
      replace('/components/autocompletes');
    },
  },
  childRoutes: [{
    path: 'buttons/*',
    onEnter(state, replace) {
      replace('/components/buttons');
    },
  }, {
    path: 'sidebars',
    onEnter(state, replace) {
      replace('/components/drawers');
    },
  }, {
    path: ':component',
    getComponent(state, cb) {
      if (__CLIENT__) {
        require.ensure(['containers/DocPage'], require => {
          cb(null, require('containers/DocPage').default);
        });
      } else {
        cb(null, require('containers/DocPage').default);
      }
    },
  }],
};
