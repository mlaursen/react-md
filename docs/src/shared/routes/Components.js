import { FIRST_COMPONENT_LINK } from 'utils/RouteUtils';

export default {
  path: 'components',
  indexRoute: {
    onEnter(state, replace) {
      replace(FIRST_COMPONENT_LINK);
    },
  },
  childRoutes: [{
    path: ':component',
    getComponent(state, cb) {
      require.ensure([], require => {
        cb(null, require('containers/DocPage').default);
      });
    },
  }, {
    path: ':section/:component',
    getComponent(state, cb) {
      require.ensure([], require => {
        cb(null, require('containers/DocPage').default);
      });
    },
  }],
};
