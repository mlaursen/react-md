import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

import "./StickyColumnsPart2.scss";

const StickyColumnsPart2: FC = () => (
  <Table className="sticky-columns-2" fullWidth>
    <TableHeader sticky>
      <TableRow>
        <TableCell>Header 1</TableCell>
        <TableCell>Header 2</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Array.from(new Array(40), (_, i) => (
        <TableRow key={i}>
          <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
          <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default StickyColumnsPart2;
