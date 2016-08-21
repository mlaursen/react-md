import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import InToolbarExample from './InToolbarExample';
import InToolbarExampleRaw from '!!raw!./InToolbarExample';

export default [{
  title: 'Simple Example',
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'In a Toolbar Example',
  code: InToolbarExampleRaw,
  children: <InToolbarExample />,
}];
