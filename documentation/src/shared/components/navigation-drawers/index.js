import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import AppRaw from '!!raw!containers/App';
import ControlReactMDDrawer from './ControlReactMDDrawer';

export default [{
  title: 'Simple Example',
  description: `
The \`NavigationDrawer\` is just a combination of the \`Drawer\` component and the \`Toolbar\`
component. It is mainly used as a full page layout manager and it also automatically transitions
any new \`children\` with the \`md-cross-fade\` animation. This works really well with \`react-router\`.
  `,
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'This Website\'s Drawer',
  code: AppRaw,
  children: <ControlReactMDDrawer />,
}];
