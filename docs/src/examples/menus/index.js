import React from 'react';

import MenuExamples from './MenuExamples';
import MenuExamplesRaw from '!!raw!./MenuExamples';

import ToggleableMenuExamlples from './ToggleableMenuExamlples';
import ToggleableMenuExamlplesRaw from '!!raw!./ToggleableMenuExamlples';

import './_menus.scss';

export default [{
  title: 'Static Examples',
  code: MenuExamplesRaw,
  children: <MenuExamples />,
}, {
  title: 'Button Toggleable Menus',
  code: ToggleableMenuExamlplesRaw,
  children: <ToggleableMenuExamlples />,
}];
