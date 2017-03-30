import React from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const Header = () => (
  <TableHeader>
    <TableRow>
      <TableColumn grow>Dessert (100g serving)</TableColumn>
      <TableColumn selectColumnHeader>Type</TableColumn>
      <TableColumn numeric adjusted={false}>Calories</TableColumn>
      <TableColumn numeric adjusted={false}>Fat (g)</TableColumn>
      <TableColumn numeric adjusted={false}>Carbs (g)</TableColumn>
      <TableColumn numeric adjusted={false}>Protein (g)</TableColumn>
      <TableColumn numeric adjusted={false}>Sodium (mg)</TableColumn>
      <TableColumn numeric adjusted={false}>Calcium (%)</TableColumn>
      <TableColumn numeric adjusted={false}>Iron (%)</TableColumn>
    </TableRow>
  </TableHeader>
);

export default Header;
