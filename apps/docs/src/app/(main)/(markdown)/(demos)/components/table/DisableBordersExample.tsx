import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";

export default function DisableBordersExample(): ReactElement {
  // try moving the `disableBorders` from the `Table` to the `TableBody`
  return (
    <Table disableBorders>
      <TableBody>
        <TableRow>
          <TableCell>Borders are disabled</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Borders are disabled</TableCell>
        </TableRow>
        <TableRow disableBorders={false}>
          <TableCell>Borders are enabled</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{"Borders don't apply"}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
