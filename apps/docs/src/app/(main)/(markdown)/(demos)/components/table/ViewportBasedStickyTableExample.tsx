import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableFooter } from "@react-md/core/table/TableFooter";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
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
