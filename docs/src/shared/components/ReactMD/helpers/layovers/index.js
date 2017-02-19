import React from 'react';

import LayoverPlayground from './LayoverPlayground';
import LayoverPlaygroundRaw from '!!raw!./LayoverPlayground';

export default [{
  title: 'Layover Playground',
  description: `
Here is a little playground where you can try some of the different
use cases of the layover.
  `,
  code: LayoverPlaygroundRaw,
  children: <LayoverPlayground />,
}];
