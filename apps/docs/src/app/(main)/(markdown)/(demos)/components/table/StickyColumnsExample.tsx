import { useCheckboxGroup } from "@react-md/core/form/useCheckboxGroup";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableCheckbox } from "@react-md/core/table/TableCheckbox";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableRow } from "@react-md/core/table/TableRow";
import type { ReactElement } from "react";

import { StickyTableSection } from "@react-md/core/table/StickyTableSection";
import styles from "./StickyColumnsExample.module.scss";

const rows = Array.from({ length: 30 }, (_, i) => `row-${i + 1}`);
const headers = Array.from({ length: 20 }, (_, i) => `Header ${i + 1}`);

export default function StickyColumnsExample(): ReactElement {
  const { getCheckboxProps, getIndeterminateProps } = useCheckboxGroup({
    name: "selection",
    values: rows,
  });

  return (
    <TableContainer className={styles.container}>
      <Table fullWidth>
        <StickyTableSection type="header">
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
        </StickyTableSection>
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
        <StickyTableSection type="footer">
          <TableRow>
            <TableCell sticky colSpan={2}>
              Sticky Footer
            </TableCell>
            <TableCell colSpan={20} />
          </TableRow>
        </StickyTableSection>
      </Table>
    </TableContainer>
  );
}
