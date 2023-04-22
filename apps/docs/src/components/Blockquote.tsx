import { Typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import type { HTMLAttributes, ReactElement } from "react";
import styles from "./Blockquote.module.scss";

export function Blockquote(
  props: HTMLAttributes<HTMLQuoteElement>
): ReactElement {
  const { className, children, ...remaining } = props;

  return (
    <Typography
      {...remaining}
      as="blockquote"
      type="subtitle-1"
      className={cnb(styles.blockquote, className)}
    >
      {children}
    </Typography>
  );
}
