import React from 'react';
import ChipExamples from './ChipExamples';
import ChipExamplesRaw from '!!raw!./ChipExamples';

import ChipsWithTextField from './ChipsWithTextField';
import ChipsWithTextFieldRaw from '!!raw!./ChipsWithTextField';

export default [{
  code: ChipExamplesRaw,
  children: <ChipExamples />,
}, {
  title: 'Chips with a Text Field',
  code: ChipsWithTextFieldRaw,
  children: <ChipsWithTextField />,
}];
