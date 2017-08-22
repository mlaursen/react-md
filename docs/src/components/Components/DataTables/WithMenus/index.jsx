import React from 'react';
import Avatar from 'react-md/lib/Avatars';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import books from 'constants/sampleData/books';

import './_styles.scss';
import KebabMenu from './KebabMenu';
import SomeCustomMenu from './SomeCustomMenu';

const { suffixes } = Avatar.defaultProps;

const WithMenus = () => (
  <DataTable baseId="menu-table">
    <TableHeader>
      <TableRow>
        <TableColumn grow>Title</TableColumn>
        <TableColumn>Author</TableColumn>
        <TableColumn />
        <TableColumn />
      </TableRow>
    </TableHeader>
    <TableBody>
      {books.map(({ title, author }, i) => (
        <TableRow key={`${title}-${author}`.replace(/\s+/g, '-')}>
          <TableColumn>{title}</TableColumn>
          <TableColumn>{author}</TableColumn>
          <SomeCustomMenu id={i} suffix={suffixes[i]} letter={title.charAt(0)} />
          <KebabMenu />
        </TableRow>
      ))}
    </TableBody>
  </DataTable>
);
export default WithMenus;
