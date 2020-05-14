import React, { ReactElement, ReactNode } from "react";
import { TableCell, TableRow } from "@react-md/table";
import { useAppSize } from "@react-md/utils";

import styles from "./LibraryInfo.module.scss";

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
        <TableCell header sticky className={styles.leftHeader}>
          {name}
        </TableCell>
        {pros}
        {cons}
      </TableRow>
    );
  }

  return (
    <>
      <TableRow className={styles.header}>
        <TableCell header sticky hAlign="center">
          {name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          header
          sticky
          hAlign="center"
          className={styles.mobileHeader}
        >
          Pros
        </TableCell>
      </TableRow>
      <TableRow>{pros}</TableRow>
      <TableRow>
        <TableCell
          header
          sticky
          hAlign="center"
          className={styles.mobileHeader}
        >
          Cons
        </TableCell>
      </TableRow>
      <TableRow>{cons}</TableRow>
    </>
  );
};

export default ResponsiveBlock;
