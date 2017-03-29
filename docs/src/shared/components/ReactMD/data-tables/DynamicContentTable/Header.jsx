import React from 'react';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';

const cn = 'md-table-column--adjusted';
const Header = () => (
  <TableHeader>
    <TableRow autoAdjust={false}>
      <TableColumn className="md-table-column--grow">Dessert (100g serving)</TableColumn>
      <TableColumn selectColumnHeader>Type</TableColumn>
      <TableColumn numeric className={cn}>Calories</TableColumn>
      <TableColumn numeric className={cn}>Fat (g)</TableColumn>
      <TableColumn numeric className={cn}>Carbs (g)</TableColumn>
      <TableColumn numeric className={cn}>Protein (g)</TableColumn>
      <TableColumn numeric className={cn}>Sodium (mg)</TableColumn>
      <TableColumn numeric className={cn}>Calcium (%)</TableColumn>
      <TableColumn numeric>Iron (%)</TableColumn>
    </TableRow>
  </TableHeader>
);

export default Header;
