import { List, type ListProps } from "react-md";
import { cnb } from "cnbuilder";
import { forwardRef } from "react";
import styles from "./NavigationItemGroup.module.scss";

export interface NavigationItemGroupProps extends ListProps {
  depth: number;
}

export const NavigationItemGroup = forwardRef<
  HTMLUListElement,
  NavigationItemGroupProps
>(function NavigationItemGroup(props, ref) {
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
