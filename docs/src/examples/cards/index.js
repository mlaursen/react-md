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
  description: `
\`Cards\` can be placed in a flexbox list by using the class
\`.md-card-list\`. It is just a basic flex helper class that applies
the correct 8px margin from each component and the edge of the screen. It
is completely optional.

You can also force all the cards to be equal size if you apply
\`.md-card-list.equal-width\`.
`,
  code: CardListExampleRaw,
  children: <CardListExample />,
}];
