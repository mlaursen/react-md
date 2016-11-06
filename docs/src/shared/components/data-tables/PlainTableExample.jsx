import React, { PureComponent } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import loremIpsum from 'lorem-ipsum';

export default class PlainTableExample extends PureComponent {
  render() {
    const rows = [...new Array(10)].map((_, i) => (
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
