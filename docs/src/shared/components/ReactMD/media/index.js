import React from 'react';

import SCSSRaw from '!!raw!./_media.scss';
import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import OtherMediaExamples from './OtherMediaExamples';
import OtherMediaExamplesRaw from '!!raw!./OtherMediaExamples';

export default [{
  title: 'Simple Example',
  description: `
You can use the \`Media\` component to display images scaled to a specific aspect ratio. The default included
aspect ratios are \`16-9\`, \`4-3\`, and \`1-1\`. You can add more by either using the \`react-md-media-aspect-ratio\`
mixin, or updating the \`md-media-aspect-ratios\` variable with additional values.

The \`Media\` component will scale to whatever the size of its container is and maintain the aspect ratio.
`,
  code: `
/* SimpleExample.jsx */
${SimpleExampleRaw}
\`\`\`

\`\`\`scss
_media.scss
${SCSSRaw}
`,
  children: <SimpleExample />,
}, {
  title: 'Other Media Examples',
  description: `
By default, the only elements that will be scaled correctly in the media component are \`img\`,
\`iframe\`, and \`svg\`. You can either update the \`$md-media-embedded-selectors\` sass variable
to include additional values, apply the \`.md-media-embedded\` class name, or apply the \`%md-media-embedded\`
placeholder.

The \`MediaOverlay\` component can even be used above videos, even though that might not really be
the best idea.
  `,
  code: OtherMediaExamplesRaw,
  children: <OtherMediaExamples />,
}];
