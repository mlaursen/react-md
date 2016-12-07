import getMarkdownPage from './getMarkdownPage';
import getSassDocPage from './getSassDocPage';

const routes = ['colors', 'themes', 'media-queries', 'grids', 'typography', 'minimizing-bundle'];

function isSassDocPage(component, tab) {
  return (component === 'themes' && tab === '2')
    || (component !== 'themes' && tab === '1');
}

function isMarkdownPage(component, tab) {
  return !tab && ['colors', 'grids', 'typography'].indexOf(component) === -1;
}

export default {
  path: 'customization/:component',
  onEnter(state, replace) {
    const { component } = state.params;
    const tab = parseInt(state.location.query.tab, 10);
    if (!component || ((component === 'themes' && tab > 2) || (component !== 'themes' && tab > 1))) {
      replace(`/customization/${component || routes[0]}`);
    }
  },
  getComponent(state, cb) {
    const {
      params: { component },
      location: { query: { tab } },
    } = state;

    if (routes.indexOf(component) === -1) {
      cb(null, null);
      return;
    } else if (isSassDocPage(component, tab)) {
      getSassDocPage(state, cb);
      return;
    } else if (isMarkdownPage(component, tab)) {
      getMarkdownPage(state, cb);
      return;
    } else if (component === 'themes' && tab === '1') {
      if (__CLIENT__) {
        require.ensure([], require => {
          cb(null, require('containers/ThemeBuilder').default);
        });
      } else {
        cb(null, require('containers/ThemeBuilder').default);
      }
      return;
    } else if (tab) {
      cb(null, null);
      return;
    }

    switch (component) {
      case 'colors':
        if (__CLIENT__) {
          require.ensure([], require => {
            cb(null, require('components/Customization/Colors').default);
          });
        } else {
          cb(null, require('components/Customization/Colors').default);
        }
        break;
      case 'grids':
        if (__CLIENT__) {
          require.ensure([], require => {
            cb(null, require('components/Customization/Grids').default);
          });
        } else {
          cb(null, require('components/Customization/Grids').default);
        }
        break;
      case 'typography':
        if (__CLIENT__) {
          require.ensure([], require => {
            cb(null, require('components/Customization/Typography').default);
          });
        } else {
          cb(null, require('components/Customization/Typography').default);
        }
        break;

      default:
        cb(null, null);
    }
  },
};
