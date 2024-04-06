import { List, type ListProps } from "@react-md/core/list/List";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import styles from "./MainNavigationGroup.module.scss";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type Tree } from "@react-md/core/tree/Tree";

export interface MainNavigationGroupProps extends ListProps {
  depth: number;
}

export const MainNavigationGroup = forwardRef<
  HTMLUListElement,
  MainNavigationGroupProps
>(function MainNavigationGroup(props, ref) {
  const { style, depth, className, children, ...remaining } = props;

  return (
    <List
      {...remaining}
      ref={ref}
      style={{ ...style, "--rmd-tree-depth": depth }}
      className={cnb(styles.container, className)}
    >
      {children}
    </List>
  );
});
