import React, { ReactElement, ReactNode } from "react";
import { TableCell, TableRow } from "@react-md/table";
import { useAppSize } from "@react-md/utils";

import styles from "./styles";

export interface ResponsiveBlockProps {
  name: ReactNode;
  pros: ReactElement;
  cons: ReactElement;
}

const ResponsiveBlock = ({
  name,
  pros,
  cons,
}: ResponsiveBlockProps): ReactElement | null => {
  const { isPhone } = useAppSize();
  if (!isPhone) {
    return (
      <TableRow>
        <TableCell header sticky className={styles("row-header")}>
          {name}
        </TableCell>
        {pros}
        {cons}
      </TableRow>
    );
  }

  return (
    <>
      <TableRow className={styles("header")}>
        <TableCell header sticky hAlign="center">
          {name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell header sticky hAlign="center" className={styles("pro-con")}>
          Pros
        </TableCell>
      </TableRow>
      <TableRow>{pros}</TableRow>
      <TableRow>
        <TableCell header sticky hAlign="center" className={styles("pro-con")}>
          Cons
        </TableCell>
      </TableRow>
      <TableRow>{cons}</TableRow>
    </>
  );
};

export default ResponsiveBlock;
