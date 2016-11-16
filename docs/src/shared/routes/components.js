import getSassDocPage from './getSassDocPage';

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
    path: '(:section/):component',
    getComponent(state, cb) {
      switch (state.location.query.tab) {
        case '1':
          if (__CLIENT__) {
            require.ensure([], require => {
              cb(null, require('containers/PropTypesPage').default);
            });
          } else {
            cb(null, require('containers/PropTypesPage').default);
          }
          break;
        case '2':
          getSassDocPage(state, cb);
          break;
        default:
          if (__CLIENT__) {
            require.ensure([], require => {
              cb(null, require('components/ExamplesPage').default);
            });
          } else {
            cb(null, require('components/ExamplesPage').default);
          }
      }
    },
  }],
};
