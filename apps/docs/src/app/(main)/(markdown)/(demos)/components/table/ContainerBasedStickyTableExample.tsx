import { StickyTableSection } from "@react-md/core/table/StickyTableSection";
import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";

import styles from "./ContainerBasedStickyTableExample.module.scss";

export default function ContainerBasedStickyTableExample(): ReactElement {
  return (
    <TableContainer className={styles.container}>
      <Table fullWidth>
        <StickyTableSection type="header">
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
          </TableRow>
        </StickyTableSection>
        <TableBody>
          {Array.from({ length: 20 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
              <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <StickyTableSection type="footer">
          <TableRow>
            <TableCell colSpan={2}>Content</TableCell>
          </TableRow>
        </StickyTableSection>
      </Table>
    </TableContainer>
  );
}
