import React from 'react';

import FixedExample from './FixedExample';
import FixedExampleRaw from '!!raw!./FixedExample';

import ShiftingExample from './ShiftingExample';
import ShiftingExampleRaw from './ShiftingExample/code';

export default [{
  title: 'Fixed Example',
  description: `
This example shows a fixed Bottom Navigation. This means that all the labels and icons
will always be visible. The active tab will change it's color to the \`$md-primary-color\` and
increase the font size to show prominence. When a tab is clicked, the ink effect will only stay
within the tab itself.
  `,
  code: FixedExampleRaw,
  children: <FixedExample />,
}, {
  title: 'Shifting Example',
  description: `
This example shows a shifting Bottom Navigtaion. This means that only the active tab will have a
visible label. With the help of the \`react-md-theme-bottom-navigations-colored\` mixin, you can
even have the theme of the bottom navigation change on each click. Just for funs.
`,
  code: ShiftingExampleRaw,
  children: <ShiftingExample />,
}];
