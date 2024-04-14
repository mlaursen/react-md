import { Avatar } from "@react-md/core/avatar/Avatar";
import { Box } from "@react-md/core/box/Box";
import { type ReactElement } from "react";
import styles from "./AvatarBorders.module.scss";

export default function AvatarBorders(): ReactElement {
  return (
    <Box className={styles.box}>
      <Avatar src="https://i.pravatar.cc/48?img=44" color="orange" />
      <Avatar color="blue">H</Avatar>
      <Avatar color="deep-orange">D</Avatar>
      <Avatar color="purple">A</Avatar>
      <Avatar theme="error" className={styles.red}>
        A
      </Avatar>
    </Box>
  );
}
