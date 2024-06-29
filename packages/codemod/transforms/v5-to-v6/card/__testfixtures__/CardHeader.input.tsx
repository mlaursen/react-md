import { type ReactElement } from "react";
import { CardHeader, Typography } from "react-md";
import cn from "classnames";
import styles from "./styles.module.scss";

export default function CardHeader(): ReactElement {
  return (
    <>
      <CardHeader
        align="top"
        beforeChildren={<p>Hello</p>}
        afterChildren={<Typography>World!</Typography>}
        contentClassName="content-classname"
      >
        Content
      </CardHeader>
      <CardHeader contentClassName={styles.className}>Content</CardHeader>
      <CardHeader contentClassName={cn(styles.className, "another")}>
        Content
      </CardHeader>
    </>
  );
}
