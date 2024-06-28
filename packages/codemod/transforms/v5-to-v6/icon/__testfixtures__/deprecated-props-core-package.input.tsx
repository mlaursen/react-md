import { type ReactElement } from "react";
import { FontIcon } from "@react-md/core/icon/FontIcon";
import styles from "./styles.module.scss";

export function Example(): ReactElement {
  return (
    <>
      <FontIcon>material_unchanged</FontIcon>
      <FontIcon iconClassName="fa fa-star" />
      <FontIcon iconClassName="fa fa-star" className={styles.icon} forceSize />
      <FontIcon iconClassName={styles.fontIcon} forceFontSize />
      <FontIcon
        iconClassName={styles.fontIcon}
        className={styles.icon}
        forceSize
        forceFontSize
      />
    </>
  );
}
