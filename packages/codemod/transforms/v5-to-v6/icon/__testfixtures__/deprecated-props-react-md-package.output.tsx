import { type ReactElement } from "react";
import { FontIcon } from "react-md";
import styles from "./styles.module.scss";

export function Example(): ReactElement {
  return (
    <>
      <FontIcon>material_unchanged</FontIcon>
      <FontIcon iconClassName="fa fa-star" />
      <FontIcon iconClassName="fa fa-star" className={styles.icon} />
      <FontIcon iconClassName={styles.fontIcon} />
      <FontIcon iconClassName={styles.fontIcon} className={styles.icon} />
    </>
  );
}
