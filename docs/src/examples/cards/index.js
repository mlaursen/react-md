import React from 'react';
import CardExamples from './CardExamples';
import CardExamplesRaw from '!!raw!./CardExamples';
import CardVideoExample from './CardVideoExample';
import CardVideoExampleRaw from '!!raw!./CardVideoExample';
import CardWeather from './CardWeather';
import CardWeatherRaw from '!!raw!./CardWeather';

import EmbeddedCSSRaw from '!!raw!./_embedded.scss';

export default [{
  title: 'Expandable Card Example with Media',
  code: CardExamplesRaw,
  children: <CardExamples />,
}, {
  title: 'Card With a Video',
  code: `
/* CardVideoExample.jsx */
${CardVideoExampleRaw}
\`\`\`

\`\`\`scss
${EmbeddedCSSRaw}
`,
  children: <CardVideoExample />,
}, {
  code: CardWeatherRaw,
  children: <CardWeather />,
}];
