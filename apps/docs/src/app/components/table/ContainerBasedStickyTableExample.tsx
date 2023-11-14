import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@react-md/core";
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
