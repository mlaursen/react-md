import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@react-md/core";
import type { ReactElement } from "react";
import { useRef } from "react";

import styles from "./ViewportBasedStickyTable.module.scss";

export function ViewportBasedStickyTable(): ReactElement {
  const tableRef = useRef<HTMLTableSectionElement>(null);
  return (
    <Table fullWidth className={styles.container}>
      <TableHeader ref={tableRef} sticky>
        <TableRow>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 40 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
            <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter sticky>
        <TableRow>
          <TableCell colSpan={40}>Footer</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
