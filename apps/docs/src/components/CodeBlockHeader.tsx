import { AppBar } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";
import styles from "./CodeBlockHeader.module.scss";

export interface CodeBlockHeaderProps extends HTMLAttributes<HTMLDivElement> {}

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
