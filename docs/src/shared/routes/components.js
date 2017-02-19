import getSassDocPage from './getSassDocPage';

const NESTED_COMPONENTS = {
  helpers: ['accessible-fake-button', 'collapse', 'focus-container', 'icon-separator', 'layovers', 'portal'],
  pickers: ['date', 'time'],
  progress: ['circular', 'linear'],
  'selection-controls': ['selection-control', 'checkboxes', 'radios', 'switches'],
};

function isValidComponent({ params: { component, section } }) {
  return !NESTED_COMPONENTS[section] || NESTED_COMPONENTS[section].indexOf(component) !== -1;
}

export default {
  path: 'components',
  indexRoute: {
    onEnter(state, replace) {
      replace('/components/autocompletes');
    },
  },
  childRoutes: [{
    path: 'buttons/*',
    onEnter(state, replace) {
      replace('/components/buttons');
    },
  }, {
    path: 'sidebars',
    onEnter(state, replace) {
      replace('/components/drawers');
    },
  }, {
    path: '(:section/):component',
    onEnter(state, replace) {
      const { component } = state.params;
      const items = NESTED_COMPONENTS[component];
      if (items) {
        replace(`/components/${component}/${items[0]}`);
      }
    },
    getComponent(state, cb) {
      if (!isValidComponent(state)) {
        if (__CLIENT__) {
          require.ensure([], require => {
            cb(null, require('components/NotFound').default);
          });
        } else {
          cb(null, require('components/NotFound').default);
        }

        return;
      }

      switch (state.location.query.tab) {
        case '1':
          if (__CLIENT__) {
            require.ensure([], require => {
              cb(null, require('containers/PropTypesPage').default);
            });
          } else {
            cb(null, require('containers/PropTypesPage').default);
          }
          break;
        case '2':
          getSassDocPage(state, cb);
          break;
        default:
          if (__CLIENT__) {
            require.ensure([], require => {
              cb(null, require('components/ExamplesPage').default);
            });
          } else {
            cb(null, require('components/ExamplesPage').default);
          }
      }
    },
  }],
};
