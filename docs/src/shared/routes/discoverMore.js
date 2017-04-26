import upgradeGuides from 'constants/upgradeGuides';
import getMarkdownPage from './getMarkdownPage';

function toMarkdownPage(path) {
  return {
    path,
    getComponent(state, cb) {
      getMarkdownPage(state, cb);
    },
  };
}

const childRoutes = ['whats-new', 'boilerplates', 'contributing'].map(toMarkdownPage);

childRoutes.splice(1, 0, {
  path: 'showcases',
  getComponent(state, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/DiscoverMore/Showcases').default);
      });
    } else {
      cb(null, require('components/DiscoverMore/Showcases').default);
    }
  },
});

childRoutes.splice(4, 0, {
  path: 'community',
  getComponent(state, cb) {
    if (__CLIENT__) {
      require.ensure([], require => {
        cb(null, require('components/DiscoverMore/Community').default);
      });
    } else {
      cb(null, require('components/DiscoverMore/Community').default);
    }
  },
});

childRoutes.splice(2, 0, {
  path: 'upgrade-guides',
  indexRoute: {
    onEnter(state, replace) {
      replace(`/upgrade-guides/${upgradeGuides[0]}`);
    },
  },
  childRoutes: upgradeGuides.map(toMarkdownPage),
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
