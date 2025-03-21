import { type ReactElement } from "react";
import { CardHeader, Typography } from "react-md";
import cn from "classnames";
import styles from "./styles.module.scss";

export default function CardHeader(): ReactElement {
  return (
    <>
      <CardHeader
        beforeAddon={<p>Hello</p>}
        afterAddon={<Typography>World!</Typography>}
        contentProps={{
          className: "content-classname"
        }}>
        Content
      </CardHeader>
      <CardHeader contentProps={{
        className: styles.className
      }}>Content</CardHeader>
      <CardHeader contentProps={{
        className: cn(styles.className, "another")
      }}>
        Content
      </CardHeader>
    </>
  );
}
