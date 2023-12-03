import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  cssUtils,
} from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./DisableStickyActiveStylesExample.module.scss";

export default function DisableStickyActiveStylesExample(): ReactElement {
  return (
    <TableContainer
      className={cssUtils({ className: styles.container, fullWidth: true })}
    >
      <Table fullWidth>
        <TableHeader sticky disableStickyStyles>
          <TableRow>
            <TableCell>Header 1</TableCell>
            <TableCell>Header 2</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 20 }, (_, i) => (
            <TableRow key={i}>
              <TableCell>{`Row ${i + 1} Cell 1`}</TableCell>
              <TableCell>{`Row ${i + 1} Cell 2`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter sticky disableStickyStyles>
          <TableRow>
            <TableCell colSpan={2}>Content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
