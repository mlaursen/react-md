const indexRoute = {
  path: 'colors',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('components/Colors').default);
    });
  },
};
const childRoutes = ['themes', 'media-queries'].map(route => ({
  path: route,
  getComponent(nextState, cb) {
    require.ensure([], require => cb(null, require('containers/MarkdownPage').default));
  },
}));
childRoutes.unshift(indexRoute);
childRoutes.push({
  path: 'typography',
  getComponent(nextState, cb) {
    require.ensure([], require => {
      cb(null, require('components/Typography').default);
    });
  },
});

export default {
  path: 'customization',
  indexRoute: {
    onEnter: (nextState, replace) => replace(`/customization/${indexRoute.path}`),
  },
  childRoutes,
};
