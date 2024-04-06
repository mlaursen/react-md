import { Table, TableBody, TableCell, TableRow } from "react-md";
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
