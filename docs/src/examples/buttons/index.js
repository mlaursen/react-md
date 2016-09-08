import React from 'react';

import './_buttons.scss';
import FlatButtonExamples from './FlatButtonExamples';
import FlatButtonExamplesRaw from '!!raw!./FlatButtonExamples';

import RaisedButtonExamples from './RaisedButtonExamples';
import RaisedButtonExamplesRaw from '!!raw!./RaisedButtonExamples';

import IconButtonExamples from './IconButtonExamples';
import IconButtonExamplesRaw from '!!raw!./IconButtonExamples';

import FloatingButtonExamples from './FloatingButtonExamples';
import FloatingButtonExamplesRaw from '!!raw!./FloatingButtonExamples';

export default [{
  title: 'Flat Buttons',
  code: FlatButtonExamplesRaw,
  children: <FlatButtonExamples />,
}, {
  title: 'Raised Buttons',
  code: RaisedButtonExamplesRaw,
  children: <RaisedButtonExamples />,
}, {
  title: 'Icon Buttons',
  code: IconButtonExamplesRaw,
  children: <IconButtonExamples />,
}, {
  title: 'Floating Buttons',
  code: FloatingButtonExamplesRaw,
  children: <FloatingButtonExamples />,
}];
