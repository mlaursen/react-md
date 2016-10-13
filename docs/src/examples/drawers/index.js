import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import MobileRightDrawerExample from './MobileRightDrawerExample';
import MobileRightDrawerExampleRaw from '!!raw!./MobileRightDrawerExample';

export default [{
  title: 'Simple Example',
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'Right Drawer Mobile',
  code: MobileRightDrawerExampleRaw,
  children: <MobileRightDrawerExample />,
}];
