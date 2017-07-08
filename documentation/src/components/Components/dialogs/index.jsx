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
import SimpleFullPageDialog from './SimpleFullPageDialog';
import SimpleFullPageDialogRaw from '!!raw-loader!./SimpleFullPageDialog.jsx';
import StaticDialog from './StaticDialog';
import StaticDialogRaw from '!!raw-loader!./StaticDialog.jsx';

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
  code: StaticDialogRaw,
  children: <StaticDialog />,
}];

const Dialogs = () => <ExamplesPage description={README} examples={examples} />;
export default Dialogs;
