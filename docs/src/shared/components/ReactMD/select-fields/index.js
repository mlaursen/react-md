import React from 'react';

import SelectFieldExamples from './SelectFieldExamples';
import SelectFieldExamplesRaw from '!!raw!./SelectFieldExamples';
import SelectFieldButtonExamples from './SelectFieldButtonExamples';
import SelectFieldButtonExamplesRaw from '!!raw!./SelectFieldButtonExamples';

export default [{
  title: 'Simple Examples',
  description: `
SelectFields are initially styled like text fields. They have an optional floating label, placeholder,
and focus indicator. In addition, the select field can have help text, error text, or be required.
  `,
  code: SelectFieldExamplesRaw,
  children: <SelectFieldExamples />,
}, {
  title: 'Select Button Examples',
  description: `
Select Fields can also be styled as if they were buttons. When you set the \`position\` to \`SelectField.Positions.BELOW\`,
the select field will appear as a button and have ink injected into it. This is generally used for desktop displays and
in data tables or toolbars.
  `,
  code: SelectFieldButtonExamplesRaw,
  children: <SelectFieldButtonExamples />,
}];
