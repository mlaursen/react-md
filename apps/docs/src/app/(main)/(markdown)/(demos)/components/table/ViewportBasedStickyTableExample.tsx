import { StickyTableSection } from "@react-md/core/table/StickyTableSection";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";
import styles from "./ViewportBasedStickyTableExample.module.scss";

export default function ViewportBasedStickyTableExample(): ReactElement {
  return (
    <Table fullWidth className={styles.container}>
      <StickyTableSection type="header">
        <TableRow>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
        </TableRow>
      </StickyTableSection>
      <TableBody>
        {Array.from({ length: 40 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
            <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <StickyTableSection type="footer">
        <TableRow>
          <TableCell colSpan={40}>Footer</TableCell>
        </TableRow>
      </StickyTableSection>
    </Table>
  );
}
