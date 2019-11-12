/* eslint-disable react/no-array-index-key */
import React from 'react';
import loremIpsum from 'lorem-ipsum';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
} from 'react-md';

const SimplePlainTable = () => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn>Lorem 1</TableColumn>
        <TableColumn>Lorem 2</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from(Array(10)).map((_, i) => (
        <TableRow key={i}>
          <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
          <TableColumn>{loremIpsum({ count: 5, units: 'words' })}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>
);

export default SimplePlainTable;
