import React from 'react';

import PaperExamples from './PaperExamples';
import PaperExamplesRaw from '!!raw!./PaperExamples';

import './_papers.scss';

export default [{
  title: 'Paper Examples',
  code: PaperExamplesRaw,
  children: <PaperExamples />,
}];
