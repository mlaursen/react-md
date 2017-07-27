import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from './Simple/code';
import OtherMediaTypes from './OtherMediaTypes';
import OtherMediaTypesRaw from '!!raw-loader!./OtherMediaTypes.jsx';

const examples = [{
  title: 'Simple Examples',
  description: `
You can use the \`Media\` component to display images scaled to a specific aspect ratio. The default included
aspect ratios are \`16-9\`, \`4-3\`, and \`1-1\`. You can add more by either using the \`react-md-media-aspect-ratio\`
mixin, or updating the \`md-media-aspect-ratios\` variable with additional values.

The \`Media\` component will scale to whatever the size of its container is and maintain the aspect ratio.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Other Media Types',
  description: `
By default, the only elements that will be scaled correctly in the media component are \`img\`,
\`iframe\`, and \`svg\`. You can either update the \`$md-media-embedded-selectors\` sass variable
to include additional values, apply the \`.md-media-embedded\` class name, or apply the \`%md-media-embedded\`
placeholder.

The \`MediaOverlay\` component can even be used above videos, even though that might not really be
the best idea.
  `,
  code: OtherMediaTypesRaw,
  children: <OtherMediaTypes />,
}];

const Media = () => <ExamplesPage description={README} examples={examples} />;
export default Media;
