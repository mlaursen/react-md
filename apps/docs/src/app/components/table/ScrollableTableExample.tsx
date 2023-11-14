import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "@react-md/core";
import { type ReactElement } from "react";

const rows = 20;
const columns = 20;

export default function ScrollableTableExample(): ReactElement {
  return (
    <TableContainer style={{ maxHeight: "20rem" }}>
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
