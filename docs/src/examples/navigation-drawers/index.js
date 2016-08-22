import React from 'react';

import NewPageDemo from './NewPageDemo';
import NewPageDemoRaw from '!!raw!./NewPageDemo';

import AppRaw from '!!raw!containers/App';
import NavigationDrawerDemo from './NavigationDrawerDemo';

export default [{
  title: 'Navigation Drawer Example',
  code: NewPageDemoRaw,
  children: <NewPageDemo />,
}, {
  title: 'This Website\'s Drawer',
  code: AppRaw,
  description: `
You can try toggling the different types of Drawer Types with the main
layout of this documentation site. When you leave this page, the Drawer
Type will be set back to \`FULL_HEIGHT\`. If you are on mobile,
you can only view the difference with a mini version. or switching to
persistent.
`,
  children: <NavigationDrawerDemo />,
}];
