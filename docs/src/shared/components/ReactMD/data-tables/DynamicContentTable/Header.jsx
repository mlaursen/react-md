import React from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const Header = () => (
  <TableHeader>
    <TableRow>
      <TableColumn grow>Dessert (100g serving)</TableColumn>
      <TableColumn selectColumnHeader>Type</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Calories</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Fat (g)</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Carbs (g)</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Protein (g)</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Sodium (mg)</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Calcium (%)</TableColumn>
      <TableColumn numeric adjusted={false} fixedClassName="nutrition-table__fixed-number">Iron (%)</TableColumn>
    </TableRow>
  </TableHeader>
);

export default Header;
