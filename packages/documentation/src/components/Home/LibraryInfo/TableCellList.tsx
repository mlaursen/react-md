import type { ReactElement, ReactNode } from "react";
import { TableCell } from "@react-md/table";

import styles from "./TableCellList.module.scss";

interface Props {
  children: ReactNode;
}

export default function TableCellList({
  children,
}: Props): ReactElement | null {
  return (
    <TableCell>
      <ul className={styles.list}>{children}</ul>
    </TableCell>
  );
}
