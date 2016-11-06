import React from 'react';

import SimpleExamples from './SimpleExamples';
import SimpleExamplesRaw from '!!raw!./SimpleExamples';

import RandomColorExamples from './RandomColorExamples';
import RandomColorExamplesRaw from '!!raw!./RandomColorExamples';

export default [{
  title: 'Simple Examples',
  description: `
An avatar can be made from either:
  - An image
  - A \`FontIcon\`
  - A letter

To create an avatar from an image, pass the \`src\` prop and either \`role="presentation"\` or
the \`alt="Whatever the alt should be"\`. When using a \`FontIcon\` or a letter in the avatar,
the background and text color can be either be randomized by adding the \`random\` prop, specifying
a \`suffix\` to apply, or just use the default of a grey background and white text.

See \`$md-avatar-default-background\` and \`$md-avatar-default-color\` on the SassDoc tab for
more information about the defaults.
`,
  code: SimpleExamplesRaw,
  children: <SimpleExamples />,
}, {
  title: 'Random Color Examples',
  description: `
The random colors for the \`Avatar\` are created by looping of the \`$md-avatar-colors\` map and
passing the values to the \`react-md-theme-avatar mixin\`. See the SassDoc tab for more information.
`,
  code: RandomColorExamplesRaw,
  children: <RandomColorExamples />,
}];
