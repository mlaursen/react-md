import React from 'react';
import PlainTableExample from './PlainTableExample';
import PlainTableExampleRaw from '!!raw!./PlainTableExample';
import DataTableExample from './DataTableExample';
import DataTableExampleRaw from '!!raw!./DataTableExample';
import ComplexDataTableComments from './ComplexDataTableComments';
import ComplexDataTableCommentsRaw from '!!raw!./ComplexDataTableComments';

import PaginationExample from './PaginationExample';
import PaginationExampleRaw from '!!raw!./PaginationExample';
import PaginationLoaderRaw from '!!raw!./PaginationLoader';

export default [{
  title: 'Plain Table Example',
  code: PlainTableExampleRaw,
  children: <PlainTableExample />,
  tableCard: true,
}, {
  title: 'Selectable Table Example',
  code: DataTableExampleRaw,
  children: <DataTableExample />,
  tableCard: true,
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
}];
