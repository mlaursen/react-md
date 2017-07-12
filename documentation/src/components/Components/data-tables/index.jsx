import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import SimplePlainTable from './SimplePlainTable';
import SimplePlainTableRaw from '!!raw-loader!./SimplePlainTable.jsx';
import SimpleSelectableTable from './SimpleSelectableTable';
import SimpleSelectableTableRaw from '!!raw-loader!./SimpleSelectableTable.jsx';
import EditableTables from './EditableTables';
import EditableTablesRaw from '!!raw-loader!./EditableTables.jsx';
import EditDialogExample from './EditDialogExample';
import EditDialogExampleRaw from '!!raw-loader!./EditDialogExample.jsx';
import PaginationExample from './PaginationExample';
import PaginationExampleRaw from './PaginationExample/code';

const examples = [{
  tableCard: true,
  title: 'Simple Plain Table',
  code: SimplePlainTableRaw,
  children: <SimplePlainTable />,
}, {
  tableCard: true,
  title: 'Simple Selectable Table',
  description: `
This example will showcase a selectable table. Checkboxes will be injected as the first cell into
each row. To help with accessibility, the \`baseId\` prop is now required on the table so that each
checkbox is updated with a unique id and a common name.

You can also update the selectable table to be \`indeterminate\` which basically updates the "select all"
checkbox to be in an "indeterminate" state when not all the rows have been checked.
  `,
  code: SimpleSelectableTableRaw,
  children: <SimpleSelectableTable />,
}, {
  title: 'Pagination Example',
  description: '',
  code: PaginationExampleRaw,
  children: <PaginationExample />,
}, {
  tableCard: true,
  title: 'Editable Content Tables',
  description: `
This example will show how you can create a table with editable content by using the additional
table components: \`EditDialogColumn\` and \`SelectFieldColumn\`. Both of these components will
attempt to stay within the viewport and automatically close if they are scrolled out of view
while open.

These two components utilize the \`baseId\` to automatically inject unique ids into each field.
Each \`SelectField\` will gain an id of \`\${baseId}-\${rowIndex}-\${columnIndex}-select-field\`.
Each \`EditDialogColumn\` will generate an id of \`\${baseId}-\${rowIndex}-\${columnIndex}-edit-dialog\`
for the dialog and \`\${baseId}-\${rowIndex}-\${columnIndex}-edit-dialog-field\` for the field in
the dialog. If these do not suit your needs, you can still override them manually as props.

The \`SelectFieldColumn\` is just a simple wrapper of a \`TableColumn\` and a \`SelectField\` but
it does some work behind the scenes to work with the \`Layover\` component. All of the props are
basically the same as the \`SelectField\` and can be used the same way.

For more information about the \`EditDialogColumn\` types, please see the following example.
  `,
  code: EditableTablesRaw,
  children: <EditableTables />,
}, {
  tableCard: true,
  title: 'Edit Dialog Examples',
  description: `
Edit dialogs have some built in interactions for handling saves and keyboard support. By default,
the value in the dialog is saved automatically whenever the dialog is closed with any interaction
**except** for pressing the escape key or hitting the cancel button in large edit dialogs. So this
means that if the user clicks somewhere else on the page, presses enter, or scrolls the page, the
value will be saved. The dialog can be updated so that the cancel action happens if a user presses
tab, clicks somewhere else on the page, or scrolls the page instead.

### Types
#### Default
The default \`EditDialog\` will just be a small dialog that displays a text field with minimal padding.

#### Large
A large \`EditDialog\` will require a \`title\` prop to display above the text field and then create
a footer including a cancel and ok button.

#### Inline
If you want to keep the UI simple, you can create inline edit dialogs which just display a text field
in the cell instead of creating a dialog (so the \`EditDialog\` is sort of a bad name by this point).
By default, a pencil icon will be added to the right side of the text field to indicate that it can
be typed into (this can also be removed via props).

### Keyboard Interactions
When the user tab-focuses the edit dialog column, the dialog will automatically be opened and the
text field will be focused for text edits. If the user presses tab in an \`inline\` or non-\`large\`
dialog, the dialog will be closed and the save interaction will be triggered (unless it is switched to
do cancel on outside interactions described above). In any case, if the user presses the escape key,
the dialog will be closed and the cancel action will be called.

When the dialog is set to \`large\`, the tab interactions will be "trapped" within the dialog until the
user selects the ok or cancel button (or presses enter on the text field). The dialog can still be closed
by pressing the escape key to cancel any cell edits.

When the dialog is set to \`inline\`, tabbing will always save the data and pressing escape will call the
cancel action.

### TextField
The \`EditDialogColumn\` uses the [TextField](/components/text-fields) behind the scenese and correctly
applies all the props to the text field. This means you can integrate help text, error messages, counters,
multiline fields, etc for the this component as well.
  `,
  code: EditDialogExampleRaw,
  children: <EditDialogExample />,
}];

const DataTables = () => <ExamplesPage description={README} examples={examples} />;
export default DataTables;
