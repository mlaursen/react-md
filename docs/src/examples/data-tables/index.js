import React from 'react';
import PlainTableExample from './PlainTableExample';
import PlainTableExampleRaw from '!!raw!./PlainTableExample';
import DataTableExample from './DataTableExample';
import DataTableExampleRaw from '!!raw!./DataTableExample';
import ComplexDataTableComments from './ComplexDataTableComments';
import ComplexDataTableCommentsRaw from '!!raw!./ComplexDataTableComments';

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
}];
