import React from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import './_styles.scss';
import KebabMenu from './KebabMenu';

const WithMenus = () => (
  <DataTable baseId="menu-table">
    <TableHeader>
      <TableRow>
        <TableColumn grow>Column 1</TableColumn>
        <TableColumn>Column 2</TableColumn>
        <TableColumn>Column 3</TableColumn>
        <TableColumn>Column 4</TableColumn>
        <TableColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableColumn>Column 1</TableColumn>
        <TableColumn>Column 2</TableColumn>
        <TableColumn>Column 3</TableColumn>
        <TableColumn>Column 4</TableColumn>
        <KebabMenu />
      </TableRow>
    </TableBody>
  </DataTable>
);
export default WithMenus;
