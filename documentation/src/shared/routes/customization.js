import getMarkdownPage from './getMarkdownPage';
import getSassDocPage from './getSassDocPage';

const indexRoute = {
  path: 'colors',
  getComponent(state, cb) {
    if (state.location.query.tab === '1') {
      getSassDocPage(state, cb);
      return;
    }

    if (__CLIENT__) {
      require.ensure(['components/Customization/Colors'], require => {
        cb(null, require('components/Customization/Colors').default);
      });
    } else {
      cb(null, require('components/Customization/Colors').default);
    }
  },
};

const childRoutes = [
  indexRoute, {
    path: 'themes',
    getComponent(state, cb) {
      switch (state.location.query.tab) {
        case '1':
          if (__CLIENT__) {
            require.ensure(['containers/ThemeBuilder'], require => {
              cb(null, require('containers/ThemeBuilder').default);
            });
          } else {
            cb(null, require('containers/ThemeBuilder').default);
          }
          break;
        case '2':
          getSassDocPage(state, cb);
          break;
        default:
          getMarkdownPage(state, cb);
      }
    },
  }, {
    path: 'media-queries',
    getComponent(state, cb) {
      if (state.location.query.tab === '1') {
        getSassDocPage(state, cb);
      } else {
        getMarkdownPage(state, cb);
      }
    },
  }, {
    path: 'grids',
    getComponent(state, cb) {
      if (state.location.query.tab === '1') {
        getSassDocPage(state, cb);
        return;
      }

      if (__CLIENT__) {
        require.ensure(['components/Customization/Grids'], require => {
          cb(null, require('components/Customization/Grids').default);
        });
      } else {
        cb(null, require('components/Customization/Grids').default);
      }
    },
  }, {
    path: 'typography',
    getComponent(state, cb) {
      if (state.location.query.tab === '1') {
        getSassDocPage(state, cb);
        return;
      }

      if (__CLIENT__) {
        require.ensure(['components/Customization/Typography'], require => {
          cb(null, require('components/Customization/Typography').default);
        });
      } else {
        cb(null, require('components/Customization/Typography').default);
      }
    },
  }, {
    path: 'minimizing-bundle',
    getComponent(state, cb) {
      if (state.location.query.tab === '1') {
        getSassDocPage(state, cb);
        return;
      }

      getMarkdownPage(state, cb);
    },
  },
];

export default {
  path: 'customization',
  indexRoute: {
    onEnter(state, replace) {
      replace(`/customization/${indexRoute.path}`);
    },
  },
  childRoutes,
};
