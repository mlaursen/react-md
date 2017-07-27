import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import SimpleCheckboxesAndSwitches from './SimpleCheckboxesAndSwitches';
import SimpleCheckboxesAndSwitchesRaw from '!!raw-loader!./SimpleCheckboxesAndSwitches.jsx';
import RadioExample from './RadioExample';
import RadioExampleRaw from '!!raw-loader!./RadioExample.jsx';

const examples = [{
  title: 'Simple Checkboxes and Switches',
  description: `
When creating a selection control, the \`id\`, \`name\`, and \`type\` are required to render the control. It is
*recommended* to always supply a \`value\` and either a \`label\` or \`aria-label\` as well.

The base \`SelectionControl\` component is probably all that you will need, but there are simple wrappers for the
\`Radio\`, \`Checkbox\`, and \`Switch\` components so that you don't need to specify a \`type\`.
  `,
  code: SimpleCheckboxesAndSwitchesRaw,
  children: <SimpleCheckboxesAndSwitches />,
}, {
  title: 'Radio Example',
  description: `
Since the radios need to be controlled to toggle the icons, there is a helper component
\`SelectionControlGroup\` that will help keep the selected state for you. This component
will also add keyboard functionality so that it matches the native \`<input type="radio">\`
elements.

The user will only be able to tab-focus the selected radio button. If the user presses tab again,
it will select the next focusable element on the page. To select different values, the user can
press the up or left arrow keys to select the previous radio button and the down or right arrow
keys to select the next button. Just like the native \`<input type="radio">\` elements, the selection
will immediately select the radio, trigger the \`onChange\` event, and loop around.
  `,
  code: RadioExampleRaw,
  children: <RadioExample />,
}];

const SelectionControls = () => <ExamplesPage description={README} examples={examples} />;
export default SelectionControls;
