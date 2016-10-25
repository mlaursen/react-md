import { FIRST_COMPONENT_LINK } from 'utils/RouteUtils';

export default {
  path: 'components',
  indexRoute: {
    onEnter(state, replace) {
      replace(FIRST_COMPONENT_LINK);
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
        require.ensure([], require => {
          cb(null, require('containers/DocPage').default);
        });
      } else {
        cb(null, require('containers/DocPage').default);
      }
    },
  }, {
    path: ':section/:component',
    getComponent(state, cb) {
      if (__CLIENT__) {
        require.ensure([], require => {
          cb(null, require('containers/DocPage').default);
        });
      } else {
        cb(null, require('containers/DocPage').default);
      }
    },
  }],
};
