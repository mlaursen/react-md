import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  isTableHeaderStickyActive,
  isTableFooterStickyActive,
  cssUtils,
} from "@react-md/core";
import { type ReactElement } from "react";
import styles from "./StickyActiveStylesExample.module.scss";

export default function StickyActiveStylesExample(): ReactElement {
  return (
    <TableContainer
      className={cssUtils({ className: styles.container, fullWidth: true })}
    >
      <Table fullWidth>
        <TableHeader
          sticky
          stickyActiveClassName={cssUtils({
            backgroundColor: "secondary",
            className: styles.active,
          })}
          isStickyActive={(entry, isInTableContainer) => {
            // this can be used to manually override if the header should be
            // considered sticky active

            // this is the default implementation and can be used as a fallback
            return isTableHeaderStickyActive(entry, isInTableContainer);
          }}
        >
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
        <TableFooter
          sticky
          stickyActiveClassName={cssUtils({
            backgroundColor: "primary",
            className: styles.active,
          })}
          isStickyActive={(entry, isInTableContainer) => {
            // this can be used to manually override if the header should be
            // considered sticky active

            // this is the default implementation and can be used as a fallback
            return isTableFooterStickyActive(entry, isInTableContainer);
          }}
        >
          <TableRow>
            <TableCell colSpan={2}>Content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
