import React, { FC } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@react-md/table";
import desserts from "constants/desserts";

const headers = [
  "Dessert (100g serving)",
  "Calories",
  "Fat (g)",
  "Carbs (g)",
  "Protein (g)",
  "Sodium (mg)",
  "Calcium (mg)",
  "Icon (mg)",
];

const SimpleExamples: FC = () => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((name, i) => (
              <TableCell key={name} grow={i === 0}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {desserts.map(
            ({
              name,
              calories,
              fat,
              carbs,
              protein,
              sodium,
              calcium,
              iron,
            }) => (
              <TableRow key={name}>
                <TableCell>{name}</TableCell>
                <TableCell align="right">{calories}</TableCell>
                <TableCell align="right">{fat}</TableCell>
                <TableCell align="right">{carbs}</TableCell>
                <TableCell align="right">{protein}</TableCell>
                <TableCell align="right">{sodium}</TableCell>
                <TableCell align="right">{calcium}</TableCell>
                <TableCell align="right">{iron}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleExamples;
