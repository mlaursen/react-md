import { List } from "@react-md/core/list/List";
import { typography } from "@react-md/core/typography/typographyStyles";
import { cnb } from "cnbuilder";
import { type ReactElement, type ReactNode } from "react";

import styles from "./TableOfContentsGroup.module.scss";

export interface TableOfContentsGroupProps {
  root?: boolean;
  children: ReactNode;
}

export function TableOfContentsGroup(
  props: TableOfContentsGroupProps
): ReactElement {
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
