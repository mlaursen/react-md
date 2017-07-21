import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import SimpleOverlay from './SimpleOverlay';
import SimpleOverlayRaw from '!!raw-loader!./SimpleOverlay.jsx';

const examples = [{
  title: 'Simple Overlay',
  description: `
This component is considered part of an "advanced API" should not be used in most cases. Any bugs
encountered are most likely due to not setting the correct \`renderNode\` or context blocking updates
in parent components by \`shouldComponentUpdate\` or \`PureComponent\`. If this doesn't dissuade you,
this example shows an example usage by creating an overlay.
  `,
  code: SimpleOverlayRaw,
  children: <SimpleOverlay />,
}];

const Portals = () => <ExamplesPage description={README} examples={examples} />;
export default Portals;
