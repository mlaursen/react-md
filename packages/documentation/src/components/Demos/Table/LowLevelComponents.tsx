import React, { FC, Fragment } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableCheckbox,
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

const LowLevelComponents: FC = () => (
  <Fragment>
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
      <TableBody hAlign="right">
        {desserts.map(
          ({ name, calories, fat, carbs, protein, sodium, calcium, iron }) => (
            <TableRow key={name}>
              <TableCell hAlign="left">{name}</TableCell>
              <TableCell>{calories}</TableCell>
              <TableCell>{fat}</TableCell>
              <TableCell>{carbs}</TableCell>
              <TableCell>{protein}</TableCell>
              <TableCell>{sodium}</TableCell>
              <TableCell>{calcium}</TableCell>
              <TableCell>{iron}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCheckbox id="root-id" />
          {headers.map((name, i) => (
            <TableCell key={name} grow={i === 0}>
              {name}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody hAlign="right">
        {desserts.map(
          (
            { name, calories, fat, carbs, protein, sodium, calcium, iron },
            i
          ) => (
            <TableRow key={name}>
              <TableCheckbox id={`root-id-${i + 1}`} />
              <TableCell hAlign="left">{name}</TableCell>
              <TableCell>{calories}</TableCell>
              <TableCell>{fat}</TableCell>
              <TableCell>{carbs}</TableCell>
              <TableCell>{protein}</TableCell>
              <TableCell>{sodium}</TableCell>
              <TableCell>{calcium}</TableCell>
              <TableCell>{iron}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  </Fragment>
);

export default LowLevelComponents;
