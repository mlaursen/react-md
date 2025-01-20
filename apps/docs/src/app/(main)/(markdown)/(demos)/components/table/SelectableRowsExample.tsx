"use client";

import { Table } from "@react-md/core/table/Table";
import { TableBody } from "@react-md/core/table/TableBody";
import { TableCell } from "@react-md/core/table/TableCell";
import { TableContainer } from "@react-md/core/table/TableContainer";
import { TableHeader } from "@react-md/core/table/TableHeader";
import { TableRow } from "@react-md/core/table/TableRow";
import { type ReactElement, useState } from "react";

export default function SelectableRowsExample(): ReactElement {
  const [selectedRows, setSelectedRows] = useState<readonly number[]>([]);
  const toggleRow = (index: number): void => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(index)) {
        return prevSelectedRows.filter((i) => i !== index);
      }

      return [...prevSelectedRows, index];
    });
  };

  return (
    <TableContainer>
      <Table fullWidth>
        <TableHeader>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
            <TableCell>Header 3</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            clickable
            onClick={() => {
              toggleRow(0);
            }}
            selected={selectedRows.includes(0)}
          >
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
          </TableRow>
          <TableRow
            clickable
            onClick={() => {
              toggleRow(1);
            }}
            selected={selectedRows.includes(1)}
          >
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
          </TableRow>
          <TableRow
            clickable
            onClick={() => {
              toggleRow(2);
            }}
            selected={selectedRows.includes(2)}
          >
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
            <TableCell>Cell 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
