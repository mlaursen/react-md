import React, { PropTypes } from 'react';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

import nutritionFacts from 'constants/nutritionFacts';

const DataTableExample = ({ onRowToggle }) => {
  const facts = nutritionFacts.map(({ name, type, calories, fat, carbs, protein, sodium, calcium, iron }) => (
    <TableRow key={name}>
      <TableColumn>{name}</TableColumn>
      <TableColumn>{type}</TableColumn>
      <TableColumn numeric>{calories}</TableColumn>
      <TableColumn numeric>{fat}</TableColumn>
      <TableColumn numeric>{carbs}</TableColumn>
      <TableColumn numeric>{protein}</TableColumn>
      <TableColumn numeric>{sodium}</TableColumn>
      <TableColumn numeric>{calcium}%</TableColumn>
      <TableColumn numeric>{iron}%</TableColumn>
    </TableRow>
  ));

  return (
    <DataTable baseId="nutrition" className="nutrition-table" onRowToggle={onRowToggle}>
      <TableHeader>
        <TableRow>
          <TableColumn>Dessert (100g serving)</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn numeric>Calories</TableColumn>
          <TableColumn numeric>Fat (g)</TableColumn>
          <TableColumn numeric>Carbs (g)</TableColumn>
          <TableColumn numeric>Protein (g)</TableColumn>
          <TableColumn numeric>Sodium (mg)</TableColumn>
          <TableColumn numeric>Calcium (%)</TableColumn>
          <TableColumn numeric>Iron (%)</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {facts}
      </TableBody>
    </DataTable>
  );
};

DataTableExample.propTypes = {
  onRowToggle: PropTypes.func, // WHen used in the next example
};

export default DataTableExample;
