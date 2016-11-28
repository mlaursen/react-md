import React from 'react';

import PlainTableExample from './PlainTableExample';
import PlainTableExampleRaw from '!!raw!./PlainTableExample';

import DataTableExample from './DataTableExample';
import DataTableExampleRaw from '!!raw!./DataTableExample';

import TablesInCards from './TablesInCards';
import TablesInCardsRaw from '!!raw!./TablesInCards';

import ComplexDataTableComments from './ComplexDataTableComments';
import ComplexDataTableCommentsRaw from '!!raw!./ComplexDataTableComments';

import PaginationExample from './PaginationExample';
import PaginationExampleRaw from '!!raw!./PaginationExample';
import PaginationLoaderRaw from '!!raw!./PaginationLoader';

import ControlledPagination from './ControlledPagination';
import ControlledPaginationRaw from '!!raw!./ControlledPagination';

export default [{
  title: 'Plain Table Example',
  code: PlainTableExampleRaw,
  children: <PlainTableExample />,
  tableCard: true,
}, {
  title: 'Data Table Example',
  description: `
When the \`plain\` prop is not enabled, the \`DataTable\` will inject a checkbox at the start of each
row which will allow the user to select that row.
`,
  code: DataTableExampleRaw,
  children: <DataTableExample />,
  tableCard: true,
}, {
  title: 'Tables In Cards',
  description: `
When using \`DataTable\`s in \`Card\`s, it might be required that additional actions or contextual
events happen when the user selects rows. There is a \`TableCardHeader\` component that can be used
to help with this.

The \`TableCardHeader\` can either display a \`title\` with \`children\` OR \`leftChildren\` with \`children\`.
The \`children\` prop _should_ normally be some icon buttons or \`MenuButton\` to do some additional actions.
By default, the first child will have the \`.md-cell--right\` class name cloned into it to force them to the
far right of the header. This can be disabled by providing \`noChildrenAdjust\`.

When the \`leftChildren\` prop is defined, it assumes that it is either an array of flat buttons, or a single
flat button. It will clone the \`.md-btn--dialog\` className into each button to style some spacing and change
the min-width. This behavior can be disabled by providing \`noLeftChildrenClone\`.

Once the user has selected a row or multiple rows, a contextual header will appear that will display the count
of selected rows as well as some new \`actions\` that can be achieved.
`,
  code: TablesInCardsRaw,
  children: <TablesInCards />,
}, {
  title: 'Complex Table Example',
  description: `
When using an edit dialog in the \`DataTable\`, the default behavior is to prevent the user to tab away
once they have focused a dialog. The user must either press \`enter\` or \`esc\` to save or cancel their
edit respectively.

If the \`EditDialog\` is \`large\`, the user's focus will be contained between the text field, the cancel button,
and the save button. In all cases, the user can click away from the dialog to close it. The text can either
be saved or cancelled when this happens by using the \`okOnOutsideClick\` prop.
`,
  code: ComplexDataTableCommentsRaw,
  children: <ComplexDataTableComments />,
  tableCard: true,
}, {
  title: 'Table Pagination Example',
  description: `
When working with giant datasets, you can of course increase performance by limiting the number of rows visible
at a time. This can be accomplished by the \`TablePagination\` component.

The \`TablePagination\` component is really a fully controlled component that expects a count of \`rows\` and
a \`onPagination\` callback function. It will be rendered as a \`tfoot\` element in the table and
contain a rows per page dropdown selector, the current context of rows visible and the total count of rows,
and buttons to either return to the previous page or advance.

It will be up to you to splice your dataset correctly from this component.
`,
  code: `
/* PaginationExample.jsx */
${PaginationExampleRaw}
\`\`\`

\`\`\`js
/* PaginationLoader.jsx */
${PaginationLoaderRaw}
`,
  children: <PaginationExample />,
  tableCard: true,
}, {
  title: 'Controlled Pagination Example',
  description: `
The \`TablePagination\` component can also be fully controlled by passing a \`page\` and \`rowsPerPage\` prop. This allows you to use query parameters or
anything else to handle the pagination if that's your thing. Unfortunately, I'm too lazy to implement that in this website so I am going to show an internal
state/controlled example.

It is probably still more helpful just to use the \`defaultPage\` and \`defaultRowsPerPage\` props.
  `,
  code: ControlledPaginationRaw,
  children: <ControlledPagination />,
  tableCard: true,
}];
