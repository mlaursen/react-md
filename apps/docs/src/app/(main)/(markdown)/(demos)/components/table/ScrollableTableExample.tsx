import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";

import styles from "./ScrollableTableExample.module.scss";

const rows = 20;
const columns = 20;

export default function ScrollableTableExample(): ReactElement {
  return (
    <TableContainer className={styles.container}>
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: columns }, (_, column) => (
              <TableCell key={column}>{`Header ${column + 1}`}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i}>
              {Array.from({ length: columns }, (_, column) => (
                <TableCell key={column}>{`Cell ${column + 1}`}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
