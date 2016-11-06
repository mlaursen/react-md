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
  description: `
You can change this app's navigation drawer to the different types. I was lazy in this demo
so if you change from a permanent drawer to a temporary or persistent, you might run into
some visibility problems. Just make sure that when you switch to the permanent drawer or
navigate away from this page, you have toggled the drawer open. The \`Drawer\` component was not
designed to have its type switched out side of media queries. In addition, if you change from
emulating a mobile device, reload the page. Like I said.. I was lazy. Sorry.
  `,
  code: AppRaw,
  children: <ControlReactMDDrawer />,
}];
