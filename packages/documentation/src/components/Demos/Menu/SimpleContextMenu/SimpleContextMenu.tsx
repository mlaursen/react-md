import React, { ReactElement } from "react";
import {
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@react-md/table";

import { contents } from "./data";
import RowWithMenu from "./RowWithMenu";

const SimpleContextMenu = (): ReactElement | null => (
  <TableContainer>
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell grow>Name</TableCell>
          <TableCell>Owner</TableCell>
          <TableCell>Last Modified</TableCell>
          <TableCell>Size</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contents.map(({ id, ...content }, index) => (
          <RowWithMenu {...content} key={id} index={index} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default SimpleContextMenu;
