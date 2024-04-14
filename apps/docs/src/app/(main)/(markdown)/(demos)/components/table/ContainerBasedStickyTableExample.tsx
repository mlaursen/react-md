import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableFooter } from "@react-md/core/table/TableFooter";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";
import styles from "./ContainerBasedStickyTableExample.module.scss";

export default function ContainerBasedStickyTableExample(): ReactElement {
  return (
    <TableContainer className={styles.container}>
      <Table fullWidth>
        <TableHeader sticky>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
              <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter sticky>
          <TableRow>
            <TableCell colSpan={2}>Content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
