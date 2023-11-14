import { Table, TableBody, TableCell, TableRow } from "@react-md/core";
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
