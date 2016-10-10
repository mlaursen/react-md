import React, { PureComponent } from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, SelectFieldColumn } from 'react-md/lib/DataTables';

const types = ['Ice cream', 'Pastry', 'Other'];

import nutritionFacts from 'constants/nutritionFacts';

export default class DataTableExamples extends PureComponent {
  render() {
    const facts = nutritionFacts.map(({ name, type, calories, fat, carbs, protein, sodium, calcium, iron }) => {
      return (
        <TableRow key={name}>
          <TableColumn>{name}</TableColumn>
          <SelectFieldColumn
            id={`${name.replace(/ /g, '-')}-type`}
            defaultValue={type}
            menuItems={types}
            inputStyle={{ width: 100 }}
          />
          <TableColumn numeric>{calories}</TableColumn>
          <TableColumn numeric>{fat}</TableColumn>
          <TableColumn numeric>{carbs}</TableColumn>
          <TableColumn numeric>{protein}</TableColumn>
          <TableColumn numeric>{sodium}</TableColumn>
          <TableColumn numeric>{calcium}%</TableColumn>
          <TableColumn numeric>{iron}%</TableColumn>
        </TableRow>
      );
    });

    return (
      <DataTable baseId="nutrition" className="nutrition-table">
        <TableHeader>
          <TableRow>
            <TableColumn>Dessert (100g serving)</TableColumn>
            <TableColumn className="md-table-column--select-header">Type</TableColumn>
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
  }
}
