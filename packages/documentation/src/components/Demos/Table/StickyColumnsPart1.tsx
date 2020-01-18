import React, { FC } from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
} from "@react-md/table";

import "./StickyColumnsPart1.scss";

const StickyColumnsPart1: FC = () => (
  <TableContainer className="sticky-columns-1">
    <Table fullWidth>
      <TableHeader sticky>
        <TableRow>
          <TableCell>Header 1</TableCell>
          <TableCell>Header 2</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from(new Array(20), (_, i) => (
          <TableRow key={i}>
            <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
            <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StickyColumnsPart1;
