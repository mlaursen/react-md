import React from 'react';
import Helmet from 'react-helmet';
import ExamplesPage from 'components/ExamplesPage';

import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import WithMedia from './WithMedia';
import WithMediaRaw from '!!raw-loader!./WithMedia.jsx';
import Expandable from './Expandable';
import ExpandableRaw from '!!raw-loader!./Expandable.jsx';
import Complex from './complex';
import ComplexRaw from './complex/code';

import './_styles.scss';
import README from './README.md';

const examples = [{
  title: 'Simple',
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Card with Media',
  description: `
This example shows how you can use the \`Card\` components alongside the \`Media\`
components to display images or videos in a card.
  `,
  code: WithMediaRaw,
  children: <WithMedia />,
}, {
  title: 'Expandable',
  description: `
Only the \`CardTitle\` and \`CardActions\` have built-in support to act as expanders
by injecting an icon button to toggle the expansion when the \`expander\` prop is
enabled. When the user clicks the expander icon, any following top-level components
that have \`expandable\` enabled on them will be collapsed/visible.
  `,
  code: ExpandableRaw,
  children: <Expandable />,
}, {
  title: 'Complex Example',
  code: ComplexRaw,
  children: <Complex />,
}];

const link = [{
  rel: 'stylesheet',
  href: 'https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css',
}];

const Cards = () => (
  <ExamplesPage examples={examples} description={README}>
    <Helmet link={link} />
  </ExamplesPage>
);

export default Cards;
