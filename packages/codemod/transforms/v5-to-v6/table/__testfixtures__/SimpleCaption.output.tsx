import type { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
} from "react-md";

import styles from "./DefaultStyles.module.scss";

export default function DefaultStyles(): ReactElement {
  return (
    (<Table className={styles.centered}>
      <Typography type="caption">This is a caption</Typography>
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
    </Table>)
  );
}
