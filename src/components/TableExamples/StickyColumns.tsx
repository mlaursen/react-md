import { useCheckboxGroup } from "@react-md/core";
import {
  Table,
  TableBody,
  TableCell,
  TableCheckbox,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@react-md/table";
import type { ReactElement } from "react";

import styles from "./StickyColumns.module.scss";

const rows = Array.from({ length: 30 }, (_, i) => `row-${i + 1}`);
const headers = Array.from({ length: 20 }, (_, i) => `Header ${i + 1}`);

export function StickyColumns(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "selection",
    values: rows,
  });

  return (
    <TableContainer className={styles.container}>
      <Table fullWidth>
        <TableHeader sticky>
          <TableRow>
            <TableCheckbox
              id="sticky-header-checkbox"
              {...getIndeterminateProps()}
              colSpan={2}
              sticky
            />
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const checkboxProps = getCheckboxProps(row);
            const { checked, onChange } = checkboxProps;

            return (
              <TableRow
                key={row}
                clickable
                selected={checked}
                onClick={onChange}
              >
                <TableCheckbox
                  id={`${row}-checkbox`}
                  {...checkboxProps}
                  sticky
                />
                <TableCell header sticky className={styles.sticky}>
                  Row Header
                </TableCell>
                {headers.map((header, cellIndex) => (
                  <TableCell key={header}>
                    {`Cell ${rowIndex + 1} - ${cellIndex + 1}`}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter sticky>
          <TableRow>
            <TableCell sticky colSpan={2}>
              Sticky Footer
            </TableCell>
            <TableCell colSpan={20} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
