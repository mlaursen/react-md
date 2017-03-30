import React from 'react';

import GoogleDocsClone from './GoogleDocsClone';
import GoogleDocsCloneRaw from './GoogleDocsClone/code';

import DropdownMenuExamples from './DropdownMenuExamples';
import DropdownMenuExamplesRaw from '!!raw!./DropdownMenuExamples';

import MenuButtonExamples from './MenuButtonExamples';
import MenuButtonExamplesRaw from '!!raw!./MenuButtonExamples';

import './_styles.scss';

export default [{
  description: `
If you are on a desktop device, you can view a google docs clone that has about 0.01% of the
functionality! Quite amazing. It is a good example of showing how you can do cascading menus
as well as context menus.
  `,
  title: 'Google Docs Clone',
  code: GoogleDocsCloneRaw,
  children: <GoogleDocsClone />,
}, {
  title: 'Dropdown Menu Example',
  code: DropdownMenuExamplesRaw,
  children: <DropdownMenuExamples />,
}, {
  description: `
The \`MenuButton\` is just a simple wrapper for merging the \`Button\` and \`Menu\` components
into one that no longer requires it to be a fully controlled component. The list of items to be
displayed in the \`Menu\` will now be the \`items\` prop instead of the \`children\`. The \`children\`
should be anything required to render the button correctly.
  `,
  title: 'MenuButton Examples',
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}];
