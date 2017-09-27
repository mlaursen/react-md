import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import README from './README.md';
import SimpleListDialog from './SimpleListDialog';
import SimpleListDialogRaw from '!!raw-loader!./SimpleListDialog.jsx';
import ActionDialog from './ActionDialog';
import ActionDialogRaw from '!!raw-loader!./ActionDialog.jsx';
import SimpleModal from './SimpleModal.jsx';
import SimpleModalRaw from '!!raw-loader!./SimpleModal.jsx';
import FocusControlDialog from './FocusControlDialog';
import FocusControlDialogRaw from '!!raw-loader!./FocusControlDialog.jsx';
import ScrollingContentAndSizing from './ScrollingContentAndSizing';
import ScrollingContentAndSizingRaw from './ScrollingContentAndSizing/code';
import SimpleFullPageDialog from './SimpleFullPageDialog';
import SimpleFullPageDialogRaw from '!!raw-loader!./SimpleFullPageDialog.jsx';
import StaticDialog from './StaticDialog';
import StaticDialogRaw from '!!raw-loader!./StaticDialog.jsx';

import stylesRaw from '!!raw-loader!./_styles.scss';

const examples = [{
  title: 'Simple List Dialog',
  description: `
A *simple* dialog is just a dialog that adds no additional functionality and just renders its children
when visible. The most basic use case is to render a list of some sort.
  `,
  code: SimpleListDialogRaw,
  children: <SimpleListDialog />,
}, {
  title: 'Dialog with Actions',
  description: `
A dialog can be updated to have additional actions. These are normally some sort of cancel/confirm buttons that
appear at the bottom of the dialog.
  `,
  code: ActionDialogRaw,
  children: <ActionDialog />,
}, {
  title: 'Controlling Dialog Focus',
  description: `
The \`Dialog\` component uses the [FocusContainer](/components/helpers/focus-containers) to trap keyboard
focus in the dialog while it is visible. By default, it will attempt to focus the first "focusable" item
in the dialog.

The following example shows how you can change some of the props to change the focus target, disable the focus
trapping, or manually focus something instead of relying on the component to focus on mount.
`,
  code: FocusControlDialogRaw,
  children: <FocusControlDialog />,
}, {
  title: 'Modal Dialog',
  description: `
A dialog can be updated so that a user **must** click one of the actions to be able to hide the dialog. They will
no longer be able to click the overlay to close it.
  `,
  code: SimpleModalRaw,
  children: <SimpleModal />,
}, {
  title: 'Scrolling Content and Sizing',
  description: `
When there is a lot of content in a \`Dialog\`, it will automatically attempt to update the height of the content
so that only it scrolls. It will make it so that the \`title\` and \`actions\` will be fixed within the dialog
and only the \`children\` of the \`Dialog\` will scroll. If you want to implement your own solution, you can
disable the \`autosizeContent\` prop.

In addition, the sizing of the dialogs can always be controlled globally at a CSS level, or a \`className\` level,
but there are one-off cases where it is simpler to just apply sizing for a specific dialog. This can be done by using
the \`height\` and \`width\` props which will just apply some inline-styles to set the size. These values will still
stay within the \`max-height\` and \`max-width\` rules applied to dialogs, so you can set a large size for desktop and
it will auto-scale down for mobile devices.
  `,
  code: ScrollingContentAndSizingRaw,
  children: <ScrollingContentAndSizing />,
}, {
  title: 'Simple Full Page Dialog',
  description: `
A dialog can be converted into a full-page dialog by enabling the \`fullPage\` prop. The dialog is "dumbed" down
when displaying in full page and no longer allows for the \`actions\` prop to be provided. It will just display
any content in the children instead.
  `,
  code: SimpleFullPageDialogRaw,
  children: <SimpleFullPageDialog />,
}, {
  title: 'Static Dialog Usage',
  description: `
The default export from the dialogs module is a wrapper for dynamically displaying the dialog as a full page element,
or creating some overlay and displaying the dialog inside. There is also the base \`Dialog\` element that can be used.
This element will always be visible and can be styled/placed with your own styles.
  `,
  code: `/* StaticDialig.jsx */
${StaticDialogRaw}
\`\`\`

\`\`\`scss
/* _styles.scss */
${stylesRaw}
  `,
  children: <StaticDialog />,
}];

const Dialogs = () => <ExamplesPage description={README} examples={examples} />;
export default Dialogs;
