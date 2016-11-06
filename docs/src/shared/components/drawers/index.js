import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import MobileRightDrawerExample from './MobileRightDrawerExample';
import MobileRightDrawerExampleRaw from '!!raw!./MobileRightDrawerExample';

export default [{
  title: 'Simple Example',
  description: `
The \`Drawer\` can be docked to the left or right of the screen. The size of the drawer depends on
whether it has been docked on the left or right of the screen and the device type or screen size.

#### Docked Left
- On mobile devices, the width of the drawer will be \`calc(100vw - 56px)\` and a max width of \`320px\`.
- On tablets and desktop screens, the width will be equal to the \`$md-drawer-tablet-width\` and \`$md-drawer-desktop-width\`
but no more than \`400px\`.

#### Docked Right
- On mobile devices, the width of the drawer will be the entire viewport.
- On tablets and desktops, the width of the drawer will be the size of its content.
`,
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'Right Drawer Mobile',
  description: `
This example shows how you could use a right drawer on mobile devices. Click on on one of the ListItem
to show a bigger version of the picture from [unsplash.it](https://unsplash.it).
  `,
  code: MobileRightDrawerExampleRaw,
  children: <MobileRightDrawerExample />,
}];
