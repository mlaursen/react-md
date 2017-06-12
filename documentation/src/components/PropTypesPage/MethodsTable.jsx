import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';

import MethodRow from './MethodRow';
import methodShape from 'propTypes/componentMethods';

const MethodsTable = ({ methods }) => {
  const rows = methods.map(method => <MethodRow {...method} key={method.name} />);

  return (
    <DataTable plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </DataTable>
  );
};

MethodsTable.propTypes = {
  methods: PropTypes.arrayOf(methodShape),
};

export default MethodsTable;
