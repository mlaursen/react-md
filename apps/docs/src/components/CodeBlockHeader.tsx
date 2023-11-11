import { AppBar, type AppBarProps } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type ReactElement } from "react";
import styles from "./CodeBlockHeader.module.scss";

export interface CodeBlockHeaderProps extends AppBarProps {}

export function CodeBlockHeader(props: CodeBlockHeaderProps): ReactElement {
  const { children, className, ...remaining } = props;
  return (
    <AppBar
      {...remaining}
      theme="clear"
      height="dense"
      className={cnb(styles.container, className)}
    >
      {children}
    </AppBar>
  );
}
