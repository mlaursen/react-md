import { useCheckboxGroup } from "@react-md/core";
import {
  Table,
  TableBody,
  TableCell,
  TableCheckbox,
  TableContainer,
  TableHeader,
  TableRow,
} from "@react-md/table";
import type { ReactElement } from "react";
import { DESSERTS } from "src/constants/desserts";

const HEADERS = [
  "Dessert (100g serving)",
  "Calories",
  "Fat (g)",
  "Carbs (g)",
  "Protein (g)",
  "Sodium (mg)",
  "Calcium (mg)",
  "Icon (mg)",
] as const;

export function SelectableRows(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    values: DESSERTS.map(({ name }) => name),
    name: "selected",
  });

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCheckbox {...getIndeterminateProps()} />
            {HEADERS.map((name, i) => (
              <TableCell key={name} grow={i === 0}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody hAlign="right">
          {DESSERTS.map((dessert) => {
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
            const checkboxProps = getCheckboxProps(name);
            const { checked, onChange } = checkboxProps;

            return (
              <TableRow
                key={name}
                clickable
                selected={checked}
                onClick={onChange}
              >
                <TableCheckbox {...checkboxProps} />
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
}
