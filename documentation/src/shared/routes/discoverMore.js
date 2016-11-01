import getMarkdownPage from './getMarkdownPage';

const childRoutes = ['whats-new', 'upgrade-guides', 'community', 'contributing'].map(path => ({
  path,
  getComponent(state, cb) {
    getMarkdownPage(state, cb);
  },
}));

export default {
  path: 'discover-more',
  indexRoute: {
    onEnter(state, replace) {
      replace('/discover-more/whats-new');
    },
  },
  childRoutes,
};
