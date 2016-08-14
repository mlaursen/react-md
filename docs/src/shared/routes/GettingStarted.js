export default {
  path: 'getting-started',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/getting-started/prerequisites'),
  },
  childRoutes: [{
    path: 'prerequisites',
    getComponent(nextState, cb) {
      require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
    },
  }, {
    path: 'installation',
    getComponent(nextState, cb) {
      require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
    },
  }],
};
