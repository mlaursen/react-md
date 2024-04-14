import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement } from "react";

export default function DisableHoverExample(): ReactElement {
  // try moving the `disableHover` from the `Table` to the `TableBody`
  return (
    <Table disableHover>
      <TableBody>
        <TableRow>
          <TableCell>Hover is disabled</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Hover is disabled</TableCell>
        </TableRow>
        <TableRow disableHover={false}>
          <TableCell>Hover is enabled</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
