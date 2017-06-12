/* eslint-disable */
import React from 'react';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const MethodRow = ({ description, name, params, returns, ...others }) => {
  console.log('returns:', returns);

  return (
    <TableRow>
      <TableColumn>
        <pre>{name}</pre>
      </TableColumn>
    </TableRow>
  );
};

export default MethodRow;
