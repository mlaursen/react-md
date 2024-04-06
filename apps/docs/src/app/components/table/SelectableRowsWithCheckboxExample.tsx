"use client";
import { desserts } from "@/constants/desserts.js";
import {
  Form,
  Table,
  TableBody,
  TableCell,
  TableCheckbox,
  TableContainer,
  TableHeader,
  TableRow,
  useCheckboxGroup,
} from "react-md";
import { type ReactElement } from "react";

export default function SelectableRowsWithCheckboxExample(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "desserts",
    values: desserts.map(({ name }) => name),
  });

  return (
    <TableContainer>
      <Form>
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCheckbox {...getIndeterminateProps()} />
              {columns.map((name, i) => (
                <TableCell key={name} grow={i === 0}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody hAlign="right">
            {desserts.map((dessert) => {
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
              const checkboxProps = getCheckboxProps(name);
              const { checked, onChange } = checkboxProps;

              return (
                <TableRow
                  key={name}
                  selected={checked}
                  onClick={onChange}
                  clickable
                >
                  <TableCheckbox {...checkboxProps} />
                  <TableCell hAlign="left">{name}</TableCell>
                  <TableCell>{type}</TableCell>
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
      </Form>
    </TableContainer>
  );
}

const columns = [
  "Dessert (100g serving)",
  "Type",
  "Calories",
  "Fat (g)",
  "Carbs (g)",
  "Protein (g)",
  "Sodium (mg)",
  "Calcium (mg)",
  "Icon (mg)",
] as const;
