import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import Simple from './Simple';
import SimpleRaw from '!!raw-loader!./Simple.jsx';
import TripPlanner from './TripPlanner';
import TripPlannerRaw from './TripPlanner/code';
import FooterChanges from './FooterChanges';
import FooterChangesRaw from '!!raw-loader!./FooterChanges.jsx';

const examples = [{
  title: 'Simple Example',
  description: `
This is just a simple example showing how you can use the \`ExpansionList\` and \`ExpansionPanel\`
components to display content.
  `,
  code: SimpleRaw,
  children: <Simple />,
}, {
  title: 'Footer Content',
  description: `
By default, an \`ExpansionPanel\` will display a save and cancel button with very simple flat button props in
a footer component. These buttons can be updated to display icons, or any other Button props by providing the
\`saveProps\`/\`cancelProps\` which will override the defaults.

Sometimes you might just want to leverage the animation properties and have dynamic content appear. To accomplish
this, you can set the \`footer\` prop to \`null\` to completely hide the footer.

In other cases, you might want to define your own footer with different actions instead. When the \`footer\`
prop is set to a valid react element/node, it will render that instead of the default save/cancel buttons.
  `,
  code: FooterChangesRaw,
  children: <FooterChanges />,
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
