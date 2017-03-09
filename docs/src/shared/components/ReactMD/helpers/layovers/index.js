import React from 'react';

import ContextMenuLayover from './ContextMenuLayover';
import ContextMenuLayoverRaw from '!!raw!./ContextMenuLayover';

import LayoverPlayground from './LayoverPlayground';
import LayoverPlaygroundRaw from '!!raw!./LayoverPlayground';

import DialogExample from './DialogExample';
import DialogExampleRaw from '!!raw!./DialogExample';

export default [{
  title: 'Context Menu Layover',
  code: ContextMenuLayoverRaw,
  children: <ContextMenuLayover />,
}, {
  title: 'Layover Playground',
  description: `
Here is a little playground where you can try some of the different
use cases of the layover.
  `,
  code: LayoverPlaygroundRaw,
  children: <LayoverPlayground />,
}, {
  title: 'Layover in Dialog',
  code: DialogExampleRaw,
  children: <DialogExample />,
}];
