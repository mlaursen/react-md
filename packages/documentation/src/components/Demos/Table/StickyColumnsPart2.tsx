import React, { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

import styles from "./StickyColumnsPart2.module.scss";

export default function StickyColumnsPart2(): ReactElement {
  return (
    <Table className={styles.container} fullWidth>
      <TableHeader sticky>
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
    </Table>
  );
}
