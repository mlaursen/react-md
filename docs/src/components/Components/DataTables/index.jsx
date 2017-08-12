import React from 'react';
import ExamplesPage from 'components/ExamplesPage';

import './_styles.scss';
import README from './README.md';
import SimplePlainTable from './SimplePlainTable';
import SimplePlainTableRaw from '!!raw-loader!./SimplePlainTable.jsx';
import SimpleSelectableTable from './SimpleSelectableTable';
import SimpleSelectableTableRaw from '!!raw-loader!./SimpleSelectableTable.jsx';
import WithMenus from './WithMenus';
import WithMenusRaw from './WithMenus/code';
import EditableTables from './EditableTables';
import EditableTablesRaw from '!!raw-loader!./EditableTables.jsx';
import EditDialogExample from './EditDialogExample';
import EditDialogExampleRaw from '!!raw-loader!./EditDialogExample.jsx';
import SimplePagination from './SimplePagination';
import SimplePaginationRaw from '!!raw-loader!./SimplePagination.jsx';
import FixedTablePagination from './FixedTablePagination';
import FixedTablePaginationRaw from './FixedTablePagination/code';
import DynamicContentTable from './DynamicContentTable';
import DynamicContentTableRaw from './DynamicContentTable/code';

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
  title: 'Tables With Menus',
  code: WithMenusRaw,
  children: <WithMenus />,
}, {
  tableCard: true,
  title: 'Simple Pagination',
  description: `
When you have large datasets, you can improve some of your app's performance by paginating your results and
limiting the number of rows displayed at a time. This example shows how you can work with the \`TablePagination\`
component and its API to easily accomplish this.

This component will be displayed at as a \`<tfoot>\` and attached to the bottom of the table. It will allow the user
to paginate forwards or backwards by a preset number of rows. The default is to start at \`10\` rows per page and allows
for \`10\`, \`20\`, \`30\`, \`40\`, \`50\`, and \`100\` by default (both of these can be configured).
`,
  code: SimplePaginationRaw,
  children: <SimplePagination />,
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
}, {
  title: 'Fixed Headers/Footers and Pagination',
  description: `
There is some _very limited_ support for fixed table headers/footers built into \`react-md\`. However, it
is advisable to use a third party library such as [react-virtualized](https://github.com/bvaughn/react-virtualized)
when dealing with heavy interaction-based tables or using fixed headers. Part of the problem with the implementation
that is built into this library is that the vertical scrollbar does not appear ntil you have scrolled horizontally
to the end which is confusing for users on OSes that display scroll bars.

If this still seems fine, there is a mixin built in that will help you create fixed tables at a specific size or
to span the entire page. See [react-md-make-fixed-table](/components/data-tables?tab=2#mixin-react-md-make-fixed-table)
for some more information there.

This example will show how you can use your fixed table headers/footers along with the \`TablePagination\` component
to dynamically retrieve data from an API and display it in your table.
  `,
  code: FixedTablePaginationRaw,
  children: <FixedTablePagination />,
}, {
  title: 'Dynamic Content Table',
  description: `
One of the use cases of tables is to have dynamic content that can be added or removed. There is a component built to
help with this named the \`TableCardHeader\` which works well with the \`DataTable\`'s selectable rows. The \`TableCardHeader\`
was built to display an optional title and any children in a \`CardTitle\` component until it is toggled to a "contextual" view
where another title and any additional actions can be displayed. A great example of this is when rows in the \`DataTable\` are
selected and you would like to allow the user to delete them.

This example will show how you can integrate \`DataTable\`s into \`Card\`s (with built in styling changes) and allow the user
to add/remove rows from the table.

> NOTE: One of the problems with the built-in checkbox support is that it uses \`React\`'s \`context\` to push the changes
down to each component. However if you ever use \`shouldComponentUpdate\` or a \`PureComponent\`, these changes won't be
persisted to the child components since they block context updates. It is recommended to take full control instead.
  `,
  code: DynamicContentTableRaw,
  children: <DynamicContentTable />,
}];

const DataTables = () => <ExamplesPage description={README} examples={examples} />;
export default DataTables;
