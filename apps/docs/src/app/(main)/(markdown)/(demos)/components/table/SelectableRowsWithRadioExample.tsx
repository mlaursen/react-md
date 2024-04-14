"use client";
import { desserts } from "@/constants/desserts.js";
import { Form } from "@react-md/core/form/Form";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRadio } from "@react-md/core/table/TableRadio";
import { TableRow } from "@react-md/core/table/TableRow";
import { useState, type ReactElement } from "react";

export default function TableRadioExample(): ReactElement {
  const [value, setValue] = useState<string | null>(null);

  return (
    <TableContainer>
      <Form>
        <Table fullWidth>
          <TableHeader>
            <TableRow>
              <TableCell header={false} />
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
              const selected = value === name;
              const onChange = (): void => {
                setValue((prevValue) => {
                  if (name === prevValue) {
                    return null;
                  }

                  return name;
                });
              };

              return (
                <TableRow
                  key={name}
                  onClick={onChange}
                  selected={selected}
                  clickable
                >
                  <TableRadio
                    name="selections"
                    checked={selected}
                    onChange={onChange}
                  />
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
