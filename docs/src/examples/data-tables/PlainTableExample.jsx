import React, { PureComponent } from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';
import loremIpsum from 'lorem-ipsum';

export default class PlainTableExample extends PureComponent {
  render() {
    const rows = Array.apply(null, new Array(10)).map((_, i) => (
      <TableRow key={i}>
        <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
        <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
      </TableRow>
    ));

    return (
      <DataTable plain>
        <TableHeader>
          <TableRow>
            <TableColumn>Lorem 1</TableColumn>
            <TableColumn>Lorem 2</TableColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows}
        </TableBody>
      </DataTable>
    );
  }
}
