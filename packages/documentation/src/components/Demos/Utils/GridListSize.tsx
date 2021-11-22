import { ReactElement } from "react";
import { Table, TableBody, TableCell, TableRow } from "@react-md/table";
import { GridList, GridListCell, useGridListSize } from "@react-md/utils";

function Cell(): ReactElement {
  const { columns, cellWidth } = useGridListSize();
  return (
    <GridListCell>
      <Table dense disableHover>
        <TableBody>
          <TableRow>
            <TableCell header>Columns:</TableCell>
            <TableCell>{columns}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell header>Cell Width:</TableCell>
            <TableCell>{cellWidth}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </GridListCell>
  );
}

export default function GridListSize(): ReactElement | null {
  return (
    <GridList>
      <Cell />
    </GridList>
  );
}
