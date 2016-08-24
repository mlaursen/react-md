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
