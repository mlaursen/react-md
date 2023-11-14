import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./ViewportBasedStickyTableExample.module.scss";

export default function ViewportBasedStickyTableExample(): ReactElement {
  return (
    <Table fullWidth className={styles.container}>
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
      <TableFooter sticky>
        <TableRow>
          <TableCell colSpan={40}>Footer</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
