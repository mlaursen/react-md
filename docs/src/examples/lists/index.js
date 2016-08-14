import React from 'react';
import ListExamples from './ListExamples';
import ListExamplesRaw from '!!raw!./ListExamples';
import ListControlsExamples from './ListControlsExamples';
import ListControlsExamplesRaw from '!!raw!./ListControlsExamples';
import UncontrolledNestedExample from './UncontrolledNestedExample';
import UncontrolledNestedExampleRaw from '!!raw!./UncontrolledNestedExample';
import ControlledNestedExample from './ControlledNestedExample';
import ControlledNestedExampleRaw from '!!raw!./ControlledNestedExample';

const listControlsMarkdown = `
A List that has controls can be implemented by using the \`ListItemControl\`
component. A control can either have a primary or a secondary action. According
to the specs, the primary action can __only__ be a \`Checkbox\`. A secondary
action can be a \`Checkbox\`, \`Switch\`, or a \`Reorder\` icon.

When using the \`ListItemControl\` component, it updates the \`primaryAction\` or
\`secondaryAction\` props so that the label is a list item's styled primary and
secondary text. It also disables the hover effect on a list item.
`;

const uncontrolledMarkdown = `
A nested list can be uncontrolled or controlled. The most simple is to
allow the list to be uncontrolled. This means that the \`ListItem\`
will control the state of whether the nested items are visible or not.
`;

const controlledMarkdown = `
A controlled list will force you to manually manage the state. The controlled
list example will also demo how to use controlled checkboxes as the primary
action for list items. Checkboxes in lists are currently only available if
you want to manually control them by passing a \`primaryAction\`
function and a \`primaryActionNode\`.
`;

export default [{
  title: 'Simple Examples',
  code: ListExamplesRaw,
  children: <ListExamples />,
}, {
  title: 'Lists with Controls',
  description: listControlsMarkdown,
  code: ListControlsExamplesRaw,
  children: <ListControlsExamples />,
}, {
  title: 'Uncontrolled Nested List Examples',
  description: uncontrolledMarkdown,
  code: UncontrolledNestedExampleRaw,
  children: <UncontrolledNestedExample />,
}, {
  title: 'Controlled Nested List Examples',
  description: controlledMarkdown,
  code: ControlledNestedExampleRaw,
  children: <ControlledNestedExample />,
}];
