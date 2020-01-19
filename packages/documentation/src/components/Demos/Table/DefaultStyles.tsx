import React, { FC } from "react";
import {
  Caption,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@react-md/table";

import "./DefaultStyles.scss";

const DefaultStyles: FC = () => (
  <Table className="base-styles-table">
    <Caption>This is a caption</Caption>
    <TableHeader>
      <TableRow>
        <TableCell>Column 1</TableCell>
        <TableCell>Column 2</TableCell>
        <TableCell>Column 3</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Cell 1-1</TableCell>
        <TableCell>Cell 1-2</TableCell>
        <TableCell>Cell 1-3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 2-1</TableCell>
        <TableCell>Cell 2-2</TableCell>
        <TableCell>Cell 2-3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cell 3-1</TableCell>
        <TableCell>Cell 3-2</TableCell>
        <TableCell>Cell 3-3</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default DefaultStyles;
