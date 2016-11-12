import React from 'react';

import SelectFieldExamples from './SelectFieldExamples';
import SelectFieldExamplesRaw from '!!raw!./SelectFieldExamples';
import SelectFieldButtonExamples from './SelectFieldButtonExamples';
import SelectFieldButtonExamplesRaw from '!!raw!./SelectFieldButtonExamples';

import './_select-fields.scss';

export default [{
  title: 'Simple Examples',
  description: `
Unlike \`TextField\`s, \`SelectField\`s are not full width by default. This is so that it is
easier to style them in \`Toolbar\`s. This basically means that if you do not specify a width
by using the grid class names or manually, the select field's width will change depending on the active item.
  `,
  code: SelectFieldExamplesRaw,
  children: <SelectFieldExamples />,
}, {
  title: 'Select Button Examples',
  code: SelectFieldButtonExamplesRaw,
  children: <SelectFieldButtonExamples />,
}];
