import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableRow from 'react-md/lib/DataTables/TableRow';

import PropTypeRow from './PropTypeRow';

const PropTypesTable = ({ ascending, sortProps, visibleProps, baseId }) => (
  <DataTable plain>
    <TableHeader>
      <TableRow>
        <TableColumn onClick={sortProps} sorted={ascending}>Prop name</TableColumn>
        <TableColumn>Prop type</TableColumn>
        <TableColumn>Description</TableColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {visibleProps.map(prop => <PropTypeRow key={prop.propName} {...prop} baseId={baseId} />)}
    </TableBody>
  </DataTable>
);

PropTypesTable.propTypes = {
  ascending: PropTypes.bool,
  sortProps: PropTypes.func,
  baseId: PropTypes.string.isRequired,
  visibleProps: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PropTypesTable;
