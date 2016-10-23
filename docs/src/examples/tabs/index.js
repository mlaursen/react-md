import React from 'react';

import SimpleTabs from './SimpleTabs';
import SimpleTabsRaw from '!!raw!./SimpleTabs';
import MusicTabExample from './MusicTabExample';
import MusicTabExampleRaw from './MusicTabExample/code';
import IconTabs from './IconTabs';
import IconTabsRaw from '!!raw!./IconTabs';

export default [{
  code: SimpleTabsRaw,
  children: <SimpleTabs />,
}, {
  code: IconTabsRaw,
  children: <IconTabs />,
}, {
  code: MusicTabExampleRaw,
  children: <MusicTabExample />,
}];
