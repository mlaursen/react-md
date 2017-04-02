import React from 'react';
import TableFooter from 'react-md/lib/DataTables/TableFooter';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const Footer = () => (
  <TableFooter>
    <TableRow selectable={false}>
      <TableColumn colSpan="100%">
        <h3 style={{ margin: 0 }}>This is a footer. Quite amazing. Yes.</h3>
      </TableColumn>
    </TableRow>
  </TableFooter>
);

export default Footer;
