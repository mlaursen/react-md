import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple';
import Random from './Random';
import RandomRaw from '!!raw-loader!./Random';

const examples = [{
  title: 'Simple',
  description: `
An avatar can be made from one of the following:
- an image
- a \`FontIcon\`,
- a letter

An avatar can be created by providing a \`src\` prop pointing to the url of the image.
When an avatar is an image, the \`alt\` or \`role="presentation"\` props should be provided
for accessibility.

When the avatar contains an icon or a letter, the colors can be defined by specifying a \`suffix\` that links into the
[md-avatar-colors](/components/avatars?tab=2#variable-md-avatar-colors) or by enabling \`random\` to randomly choose
one of the suffixes to apply.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Random',
  code: RandomRaw,
  children: <Random />,
}];

const Avatars = () => <ExamplesPage description={README} examples={examples} />;

export default Avatars;
