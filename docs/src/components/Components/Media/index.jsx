import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

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
By default, \`img\`, \`iframe\`, \`svg\`, \`video\`, \`embed\`, and \`object\` elements will be
scaled correctly within a \`Media\` component. These defaults can be changed  by updating the
[md-media-embedded-selectors](/components/media?tab=2#variable-md-media-embedded-selectors).

The \`MediaOverlay\` component can even be used above videos, even though that might not really be
the best idea.
  `,
  code: OtherMediaTypesRaw,
  children: <OtherMediaTypes />,
}];

const Media = () => <ExamplesPage examples={examples} />;
export default Media;
