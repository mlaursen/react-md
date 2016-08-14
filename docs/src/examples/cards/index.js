import React from 'react';
import CardExamples from './CardExamples';
import CardExamplesRaw from '!!raw!./CardExamples';
import CardListExample from './CardListExample';
import CardListExampleRaw from '!!raw!./CardListExample';

import './_styles.scss';

export default [{
  title: 'Expandable Card Example with Media',
  code: CardExamplesRaw,
  children: <CardExamples />,
}, {
  title: 'Card List',
  code: CardListExampleRaw,
  children: <CardListExample />,
}];
