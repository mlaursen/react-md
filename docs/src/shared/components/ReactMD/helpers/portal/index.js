import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

export default [{
  title: 'Simple Example',
  description: `
Clicking on the button in this example will create a temporary overlay. Keyboard users can press the
enter key once open to close the overlay. All other users can just click or touch the overlay.
`,
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}];
