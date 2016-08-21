export default {
  path: 'getting-started',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/getting-started/prerequisites'),
  },
  childRoutes: [{
    path: 'prerequisites',
    getComponent(nextState, cb) {
      if (__CLIENT__) {
        require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
      } else {
        cb(null, require('containers/MarkdownPage').default);
      }
    },
  }, {
    path: 'installation',
    getComponent(nextState, cb) {
      if (__CLIENT__) {
        require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
      } else {
        cb(null, require('containers/MarkdownPage').default);
      }
    },
  }],
};
