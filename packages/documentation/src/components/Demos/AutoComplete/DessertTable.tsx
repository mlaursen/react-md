import React, { FC } from "react";
import { Table, TableBody, TableRow, TableCell } from "@react-md/table";
import { CrossFade } from "@react-md/transition";

import { Dessert } from "constants/desserts";

export interface DessertTableProps {
  dessert: null | Dessert;
}

const DessertTable: FC<DessertTableProps> = ({ dessert }) => {
  if (!dessert) {
    return null;
  }

  const {
    name,
    type,
    calories,
    fat,
    carbs,
    protein,
    sodium,
    calcium,
    iron,
  } = dessert;

  return (
    <CrossFade key={name}>
      <Table fullWidth>
        <TableBody>
          <TableRow>
            <TableCell header scope="row">
              Name
            </TableCell>
            <TableCell grow>{name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Type
            </TableCell>
            <TableCell>{type}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Calories
            </TableCell>
            <TableCell>{calories}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Fat
            </TableCell>
            <TableCell>{fat}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Carbs
            </TableCell>
            <TableCell>{carbs}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Protein
            </TableCell>
            <TableCell>{protein}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Calcium
            </TableCell>
            <TableCell>{calcium}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Iron
            </TableCell>
            <TableCell>{iron}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header scope="row">
              Sodium
            </TableCell>
            <TableCell>{sodium}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CrossFade>
  );
};

export default DessertTable;
