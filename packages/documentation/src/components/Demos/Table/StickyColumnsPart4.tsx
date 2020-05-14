import React, { FC } from "react";
import { useIndeterminateChecked } from "@react-md/form";
import {
  Table,
  TableBody,
  TableCell,
  TableCheckbox,
  TableContainer,
  TableHeader,
  TableRow,
} from "@react-md/table";

import styles from "./StickyColumnsPart4.module.scss";

const rows = Array.from(new Array(30), (_, i) => `row-${i + 1}`);
const headers = Array.from(new Array(20), (_, i) => `Header ${i + 1}`);

const StickyColumnsPart4: FC = () => {
  const { rootProps, getProps } = useIndeterminateChecked(rows);

  return (
    <TableContainer className={styles.container}>
      <Table fullWidth>
        <TableHeader sticky>
          <TableRow>
            <TableCheckbox
              id="sticky-header-checkbox"
              {...rootProps}
              colSpan={2}
              /**
               * Manually set sticky to "header-cell" so it is fixed to the
               * `top` and `left` instead of the default of just `top`
               */
              sticky="header-cell"
            />
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => {
            const checkboxProps = getProps(row);
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
                <TableCell
                  header
                  /**
                   * Set the sticky behavior to "cell" so it applies the `left`
                   * styling instead of the the default header cell behavior of
                   * `top`
                   */
                  sticky="cell"
                  className={styles.sticky}
                >
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
      </Table>
    </TableContainer>
  );
};

export default StickyColumnsPart4;
