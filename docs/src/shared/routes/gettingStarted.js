import getMarkdownPage from './getMarkdownPage';

export default {
  path: 'getting-started',
  indexRoute: {
    onEnter: (nextState, replace) => replace('/getting-started/prerequisites'),
  },
  childRoutes: [{
    path: 'prerequisites',
    getComponent(nextState, cb) {
      getMarkdownPage(nextState, cb);
    },
  }, {
    path: 'installation',
    getComponent(nextState, cb) {
      getMarkdownPage(nextState, cb);
    },
  }],
};
