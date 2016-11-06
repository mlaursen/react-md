const indexRoute = {
  path: 'colors',
  getComponent(nextState, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/Colors').default);
      });
    } else {
      cb(null, require('components/Colors').default);
    }
  },
};
const childRoutes = ['themes', 'media-queries'].map(route => ({
  path: route,
  getComponent(nextState, cb) {
    if (__CLIENT__) {
      require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
    } else {
      cb(null, require('containers/MarkdownPage').default);
    }
  },
}));
childRoutes.unshift(indexRoute);

childRoutes.push({
  path: 'grids',
  getComponent(nextState, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/Grids').default);
      });
    } else {
      cb(null, require('components/Grids').default);
    }
  },
});

childRoutes.push({
  path: 'typography',
  getComponent(nextState, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/Typography').default);
      });
    } else {
      cb(null, require('components/Typography').default);
    }
  },
});

export default {
  path: 'customization',
  indexRoute: {
    onEnter: (nextState, replace) => replace(`/customization/${indexRoute.path}`),
  },
  childRoutes,
};
