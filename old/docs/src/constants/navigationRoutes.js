export const componentRoutes = [
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
  'font-icons',
  'grids', {
    to: 'helpers',
    routes: [
      'accessible-fake-buttons',
      'collapses',
      'focus-containers',
      'icon-separators',
      'layovers',
      'portals',
      'resize-observers',
    ],
  }, 'inks',
  'lists',
  'media',
  'menus',
  'navigation-drawers',
  'papers', {
    to: 'pickers',
    routes: ['date', 'time'],
  }, {
    to: 'progress',
    routes: ['circular', 'linear'],
  },
  'select-fields',
  'selection-controls',
  'sliders',
  'snackbars',
  'subheaders',
  'svg-icons',
  'tabs',
  'text-fields',
  'toolbars',
  'tooltips',
];

const navigationRoutes = [{
  to: '',
  exact: true,
  icon: 'home',
}, {
  to: 'getting-started',
  icon: 'info_outline',
  routes: ['prerequisites', 'installation'],
}, {
  to: 'customization',
  icon: 'color_lens',
  routes: [
    'colors',
    'themes',
    'theme-builder',
    'typography',
    'media-queries',
    'minimizing-bundle', {
      label: 'SassDoc',
      href: '/sassdoc',
    },
  ],
}, {
  to: 'discover-more',
  icon: 'search',
  routes: [
    'whats-new', {
      to: 'upgrade-guides',
      routes: [
        'v1.1.0',
        'v1.0.0',
        'v0.3.0',
      ],
    },
    'showcases',
    'community',
    'contributing', {
      to: 'routing-examples',
      routes: [
        'bottom-navigations',
        'drawers',
        'navigation-drawers',
      ],
    },
    'testing',
  ],
}, {
  to: 'components',
  icon: 'build',
  routes: componentRoutes,
}];

export default navigationRoutes;
