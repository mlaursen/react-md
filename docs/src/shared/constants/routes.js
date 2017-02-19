export default [{
  path: '',
  icon: 'home',
  primaryText: 'Home',
}, {
  path: 'getting-started',
  icon: 'info_outline',
  nestedItems: ['prerequisites', 'installation'],
}, {
  path: 'customization',
  icon: 'color_lens',
  nestedItems: [
    'colors',
    'themes',
    'media-queries',
    'grids',
    'typography', {
      primaryText: 'SassDoc',
      href: '/sassdoc',
    }, 'minimizing-bundle',
  ],
}, {
  path: 'discover-more',
  icon: 'search',
  nestedItems: [
    'whats-new',
    'boilerplates', {
      path: 'upgrade-guides',
      nestedItems: [{
        path: 'v1.0.0',
        primaryText: 'Upgrading to v1.0.0',
      }, {
        path: 'v0.3.0',
        primaryText: 'Upgrading to v0.3.0',
      }],
    }, 'community',
    'contributing',
  ],
}, {
  path: 'components',
  icon: 'build',
  nestedItems: [
    'autocompletes',
    'avatars',
    'badges',
    'bottom-navigations',
    'buttons',
    'cards',
    'chips',
    'data-tables',
    'dialogs',
    'dividers',
    'drawers',
    'expansion-panels',
    'file-inputs',
    'font-icons', {
      path: 'helpers',
      nestedItems: [
        'accessible-fake-button',
        'collapse',
        'focus-container',
        'icon-separator',
        'layovers',
        'portal',
      ],
    }, 'inks',
    'lists',
    'media',
    'menus',
    'navigation-drawers',
    'papers', {
      path: 'pickers',
      nestedItems: ['date', 'time'],
    }, {
      path: 'progress',
      nestedItems: ['circular', 'linear'],
    }, 'select-fields', {
      path: 'selection-controls',
      nestedItems: ['selection-control', 'checkboxes', 'radios', 'switches'],
    },
    'sliders',
    'snackbars',
    'subheaders',
    'tabs',
    'text-fields',
    'toolbars',
    'tooltips',
  ],
}];
