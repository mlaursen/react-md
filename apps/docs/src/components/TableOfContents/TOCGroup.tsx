import { List, typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import styles from "./TOCGroup.module.scss";

export interface TOCGroupProps {
  root?: boolean;
  children: ReactNode;
}

export function TOCGroup(props: TOCGroupProps): ReactElement {
  const { root, children } = props;
  return (
    <List
      className={cnb(
        typography({ type: "subtitle-1" }),
        !root && styles.noPadding
      )}
    >
      {children}
    </List>
  );
}
