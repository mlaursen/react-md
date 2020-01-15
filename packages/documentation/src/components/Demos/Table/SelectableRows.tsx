import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TableCheckbox,
} from "@react-md/table";

import desserts from "constants/desserts";
import { useIndeterminateChecked } from "@react-md/form";

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

const SelectableRows: FC = () => {
  const { rootProps, getProps } = useIndeterminateChecked(
    desserts.map(({ name }) => name)
  );

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCheckbox id="selectable-rows-root-checkbox" {...rootProps} />
            {headers.map((name, i) => (
              <TableCell key={name} grow={i === 0}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody hAlign="right">
          {desserts.map((dessert, i) => {
            const {
              name,
              calories,
              fat,
              carbs,
              protein,
              sodium,
              calcium,
              iron,
            } = dessert;
            const checkboxProps = getProps(name);
            const { checked, onChange } = checkboxProps;

            return (
              <TableRow
                key={name}
                clickable
                selected={checked}
                onClick={onChange}
              >
                <TableCheckbox
                  id={`selectable-rows-checkbox-${i + 1}`}
                  {...checkboxProps}
                />
                <TableCell hAlign="left">{name}</TableCell>
                <TableCell>{calories}</TableCell>
                <TableCell>{fat}</TableCell>
                <TableCell>{carbs}</TableCell>
                <TableCell>{protein}</TableCell>
                <TableCell>{sodium}</TableCell>
                <TableCell>{calcium}</TableCell>
                <TableCell>{iron}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SelectableRows;
