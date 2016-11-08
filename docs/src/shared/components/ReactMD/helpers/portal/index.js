import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

export default [{
  title: 'Simple Example',
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}];
