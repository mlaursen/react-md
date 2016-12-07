import React from 'react';
import ExpandableMediaCard from './ExpandableMediaCard';
import ExpandableMediaCardRaw from '!!raw!./ExpandableMediaCard';
import CardVideoExample from './CardVideoExample';
import CardVideoExampleRaw from '!!raw!./CardVideoExample';
import CardWeather from './CardWeather';
import CardWeatherRaw from '!!raw!./CardWeather';

export default [{
  title: 'Expandable Media Card Example',
  description: `
This example shows how you can use the \`Media\` component alongside the \`Card\` component and
have some additional content that can be expanded and viewed.

Only the \`CardTitle\` and \`CardActions\` can act as an expander. If the component has the \`isExpander\`
prop enabled, it will inject an icon button to the right that will allow all other children that have the
\`expandable\` prop enabled. When the user clicks the expander button, all children below the expander
will be toggled.
`,
  code: ExpandableMediaCardRaw,
  children: <ExpandableMediaCard />,
}, {
  title: 'Card With a Video',
  description: 'This simple example shows how you can even embed youtube videos into cards.',
  code: CardVideoExampleRaw,
  children: <CardVideoExample />,
}, {
  title: 'In Depth Example',
  code: CardWeatherRaw,
  children: <CardWeather />,
}];
