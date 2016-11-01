import getMarkdownPage from './getMarkdownPage';

function toMarkdownPage(path) {
  return {
    path,
    getComponent(state, cb) {
      getMarkdownPage(state, cb);
    },
  };
}

const childRoutes = ['whats-new', 'community', 'contributing'].map(toMarkdownPage);

childRoutes.splice(1, 0, {
  path: 'upgrade-guides',
  indexRoute: {
    onEnter(state, replace) {
      replace('/upgrade-guids/v1.0.0');
    },
  },
  childRoutes: ['v1.0.0', 'v0.3.0'].map(toMarkdownPage),
});

export default {
  path: 'discover-more',
  indexRoute: {
    onEnter(state, replace) {
      replace('/discover-more/whats-new');
    },
  },
  childRoutes,
};
