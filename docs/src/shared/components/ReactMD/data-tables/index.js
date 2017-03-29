import React from 'react';

import PlainTableExample from './PlainTableExample';
import PlainTableExampleRaw from '!!raw!./PlainTableExample';

import DynamicContentTable from './DynamicContentTable';
import DynamicContentTableRaw from './DynamicContentTable/code';

import ConfigurableTableExample from './ConfigurableTableExample';
import ConfigurableTableExampleRaw from './ConfigurableTableExample/code';

import PaginationExample from './PaginationExample';
import PaginationExampleRaw from './PaginationExample/code';

export default [{
  title: 'Plain Table Example',
  description: `
A plain table removes the checkboxes from the table and updates the cells to not
enforce a strict height. This allows for more dynamic and multiple line content.
  `,
  code: PlainTableExampleRaw,
  children: <PlainTableExample />,
  tableCard: true,
}, {
  title: 'Dynamic Content Table',
  description: `
This example will show how you can make a fully interactive data table that allows a user
to insert/remove rows. This exmaple will use the \`EditDialogColumn\` for the inline cell edits
and the \`SelectFieldColumn\` for the select fields.

When tables are placed in cards, it can be useful to have additional interactions such as inserting
and removing rows. The \`TableCardHeader\` is the component that will manage this for you. This component
will display as a \`CardTitle\` until the \`visible\` prop is enabled. It will then show a "contextual header"
that will show some additional actions or a different title. This is normally used when rows in the table
have been selected.
  `,
  code: DynamicContentTableRaw,
  children: <DynamicContentTable />,
}, {
  title: 'Configurable Data Table Example',
  description: `
This example will show some of the different configuration options for the \`TableColumn\` and \`EditDialogColumn\`.
The \`TableColumn\` can be used to show a sort icon based on the \`sorted\` prop. The sorting will have to happen
manually on your end.

The \`EditDialogColumn\` can be displayed in a dialog, a large dialog, or inline. The defalt behavior for the dialog
versions is to "save" the cell when the user presses enter. If the user hits escape, their changes will be undone and
the value will be reset before the dialog was opened.
  `,
  code: ConfigurableTableExampleRaw,
  children: <ConfigurableTableExample />,
  tableCard: true,
}, {
  title: 'Pagination Example',
  description: `
When working with giant datasets, you can of course increase performance by limiting the number of rows visible
at a time. This can be accomplished by the \`TablePagination\` component.

The \`TablePagination\` component is really a fully controlled component that expects a count of \`rows\` and
a \`onPagination\` callback function. It will be rendered as a \`tfoot\` element in the table and
contain a rows per page dropdown selector, the current context of rows visible and the total count of rows,
and buttons to either return to the previous page or advance.

It will be up to you to splice your dataset correctly from this component.
`,
  code: PaginationExampleRaw,
  children: <PaginationExample />,
  tableCard: true,
}];
