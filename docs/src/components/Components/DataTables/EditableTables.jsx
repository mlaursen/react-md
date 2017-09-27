import React from 'react';
import { upperFirst } from 'lodash/string';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import SelectFieldColumn from 'react-md/lib/DataTables/SelectFieldColumn';

import desserts from 'constants/sampleData/desserts';

const headers = Object.keys(desserts[0]).map((name, i) => ({
  key: name,
  name: upperFirst(name),
  numeric: i > 1,
  selectColumnHeader: i === 1,
}));

const types = desserts.reduce((list, dessert) => {
  if (list.indexOf(dessert.type) === -1) {
    list.unshift(dessert.type);
  }

  return list;
}, ['Other']);

const EditableTables = () => (
  <DataTable baseId="table-with-interactions">
    <TableHeader>
      <TableRow>
        {headers.map(({ name, ...props }, i) => <TableColumn {...props} grow={i === 0}>{name}</TableColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {desserts.map(({ name, type, calories, fat, carbs, protein, sodium, calcium, iron }) => (
        <TableRow key={name}>
          <EditDialogColumn defaultValue={name} label="Name" placeholder="Yummy food" />
          <SelectFieldColumn menuItems={types} defaultValue={type} />
          <TableColumn numeric>{calories}</TableColumn>
          <TableColumn numeric>{fat}</TableColumn>
          <TableColumn numeric>{carbs}</TableColumn>
          <TableColumn numeric>{protein}</TableColumn>
          <TableColumn numeric>{sodium}</TableColumn>
          <TableColumn numeric>{calcium}</TableColumn>
          <TableColumn numeric>{iron}</TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </DataTable>
);

export default EditableTables;
