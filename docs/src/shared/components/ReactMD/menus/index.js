import React from 'react';

import MenuExample from './MenuExample';
import MenuExampleRaw from '!!raw!./MenuExample';

import GoogleDocsClone from './GoogleDocsClone';
import GoogleDocsCloneRaw from './GoogleDocsClone/code';

export default [{
  title: 'Google Docs Clone',
  code: GoogleDocsCloneRaw,
  children: <GoogleDocsClone />,
}, {
  title: 'Menu Example',
  code: MenuExampleRaw,
  children: <MenuExample />,
}];
