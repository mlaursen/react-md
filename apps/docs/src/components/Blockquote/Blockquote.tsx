import { typography } from "@react-md/core";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement } from "react";
import styles from "./Blockquote.module.scss";

export default function Blockquote({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLQuoteElement>): ReactElement {
  return (
    <blockquote
      {...props}
      className={cnb(
        styles.blockquote,
        typography({ type: "subtitle-2" }),
        className
      )}
    >
      {children}
    </blockquote>
  );
}
