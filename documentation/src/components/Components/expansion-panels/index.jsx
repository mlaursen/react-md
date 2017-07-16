import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import TripPlanner from './TripPlanner';
import TripPlannerRaw from './TripPlanner/code';

const examples = [{
  title: 'Simple Example',
  description: `
This is just a simple example showing how you can use the \`ExpansionList\` and \`ExpansionPanel\`
components to display content.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Complex Example',
  description: `
This example is a bit more in-depth about how you can make a trip planner type of interface. This touches
on some of the other points about the two components.

1. The \`ExpansionList\` clones required props into the \`ExpansionPanel\` component.
2. You can display a different label once the \`ExpansionPanel\` has been opened.
3. Providing arrays instead of a single node has different behaviors.

The \`ExpansionList\` clones multiple props into the \`ExpansionPanel\` to handle styles and keyboard accessibility.
This is normally not a problem if your interface is simple and does not require separate files for your different components.
If you create a separate component/file for each panel, you will need to manually provide those injected props to the panel.

You can update the \`ExpansionPanel\` so that it can optional display a different secondary label while open. This can be useful
when the content requires some additional context only when visible.

Finally, providing lists instead of a single node/string can format the \`ExpansionPanel\`'s labels. When a list is provided to
the \`label\` prop, it will start checking if the content is two lines and update the height a bit. When you want some additional
sub text for the main label, you should create a node with the className of \`md-panel-secondary-label\` to get some additional
styles and positioning. When an list is provided to the \`secondaryLabel\` prop, it will attempt to create a new column for each
index.
  `,
  code: TripPlannerRaw,
  children: <TripPlanner />,
}];

const ExpansionPanels = () => <ExamplesPage description={README} examples={examples} />;
export default ExpansionPanels;
