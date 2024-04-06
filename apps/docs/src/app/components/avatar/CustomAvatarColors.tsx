import { Avatar } from "react-md";
import { type ReactElement } from "react";
import styles from "./CustomAvatarColors.module.scss";

export default function CustomAvatarColors(): ReactElement {
  return (
    <>
      <Avatar className={styles.avatar1}>C</Avatar>
      <Avatar className={styles.avatar2}>C</Avatar>
    </>
  );
}
