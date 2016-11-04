import React from 'react';

import SimpleExample from './SimpleExample';
import SimpleExampleRaw from '!!raw!./SimpleExample';

import ComplexExample from './ComplexExample';
import ComplexExampleRaw from '!!raw!./ComplexExample';

import ExpansionPanelSCSS from '!!raw!./_expansion-panels.scss';
import TripNamePanelRaw from '!!raw!./TripNamePanel';
import DestinationsPanelRaw from '!!raw!./DestinationsPanel';
import TravelDatesPanelRaw from '!!raw!./TravelDatesPanel';
import CarrierPanelRaw from '!!raw!./CarrierPanel';
import MealPreferencesPanelRaw from '!!raw!./MealPreferencesPanel';

export default [{
  title: 'Simple Example',
  description: `
An \`ExpansionPanel\` consists of a header containing labels to define what appears once the
panel is expanded. Once the panel has been opened, some additional content (usually form specific
data), and the user can then confirm or cancel any changes.
  `,
  code: SimpleExampleRaw,
  children: <SimpleExample />,
}, {
  title: 'Complex Example',
  code: `
/* ComplexExample.jsx */
${ComplexExampleRaw}
\`\`\`

\`\`\`js
/* TripNamePanel.jsx */
${TripNamePanelRaw}
\`\`\`

\`\`\`js
/* DestinationsPanel.jsx */
${DestinationsPanelRaw}
\`\`\`

\`\`\`js
/* TravelDatesPanel.jsx */
${TravelDatesPanelRaw}
\`\`\`

\`\`\`js
/* CarrierPanel.jsx */
${CarrierPanelRaw}
\`\`\`

\`\`\`js
/* MealPreferencesPanel.jsx */
${MealPreferencesPanelRaw}
\`\`\`

\`\`\`scss
/* _expansion-panels.scss */
${ExpansionPanelSCSS}
`,
  children: <ComplexExample />,
}];
