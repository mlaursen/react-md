/* eslint-disable react/no-array-index-key */
import React from 'react';
import loremIpsum from 'lorem-ipsum';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const SimpleSelectableTable = () => (
  <DataTable baseId="simple-selectable-table" indeterminate>
    <TableHeader>
      <TableRow>
        <TableColumn grow>Lorem 1</TableColumn>
        <TableColumn>Lorem 2</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {[...new Array(10)].map((_, i) => (
        <TableRow key={i}>
          <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
          <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>
);

export default SimpleSelectableTable;
