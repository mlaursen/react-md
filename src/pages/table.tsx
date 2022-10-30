import { Box } from "@react-md/core";
import { useCheckboxGroup } from "@react-md/form";
import {
  Caption,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TableCheckbox,
} from "@react-md/table";
import type { ReactElement } from "react";
import { DemoHeadingWithDivider } from "src/components/DemoHeadingWithDivider";
import { desserts } from "src/constants/desserts";

function DefaultStyles(): ReactElement {
  return (
    <Table>
      <Caption>This is a caption</Caption>
      <TableHeader>
        <TableRow>
          <TableCell>Column 1</TableCell>
          <TableCell>Column 2</TableCell>
          <TableCell>Column 3</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Cell 1-1</TableCell>
          <TableCell>Cell 1-2</TableCell>
          <TableCell>Cell 1-3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell 2-1</TableCell>
          <TableCell>Cell 2-2</TableCell>
          <TableCell>Cell 2-3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Cell 3-1</TableCell>
          <TableCell>Cell 3-2</TableCell>
          <TableCell>Cell 3-3</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

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

function SelectableRows(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    values: desserts.map(({ name }) => name),
    name: "selected",
  });

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCheckbox {...getIndeterminateProps()} />
            {headers.map((name, i) => (
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

export default function TableDemos(): ReactElement {
  return (
    <Box stacked>
      <DemoHeadingWithDivider>Default Styles</DemoHeadingWithDivider>
      <DefaultStyles />
      <DemoHeadingWithDivider>Selectable Rows</DemoHeadingWithDivider>
      <SelectableRows />
    </Box>
  );
}
