import React from 'react';

import MenuExamples from './MenuExamples';
import MenuExamplesRaw from '!!raw!./MenuExamples';

import MenuButtonExamples from './MenuButtonExamples';
import MenuButtonExamplesRaw from '!!raw!./MenuButtonExamples';

import './_menus.scss';

export default [{
  title: 'Static Examples',
  code: MenuExamplesRaw,
  children: <MenuExamples />,
}, {
  title: 'Menu Button Examples',
  code: MenuButtonExamplesRaw,
  children: <MenuButtonExamples />,
}];
