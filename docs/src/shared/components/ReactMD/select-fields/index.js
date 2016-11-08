import React from 'react';

import SelectFieldExamples from './SelectFieldExamples';
import SelectFieldExamplesRaw from '!!raw!./SelectFieldExamples';
import SelectFieldButtonExamples from './SelectFieldButtonExamples';
import SelectFieldButtonExamplesRaw from '!!raw!./SelectFieldButtonExamples';

import './_select-fields.scss';

export default [{
  title: 'Simple Examples',
  code: SelectFieldExamplesRaw,
  children: <SelectFieldExamples />,
}, {
  title: 'Select Button Examples',
  code: SelectFieldButtonExamplesRaw,
  children: <SelectFieldButtonExamples />,
}];
