import { AppBar, AppBarTitle, Divider } from "@react-md/core";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";
import styles from "./VerticalDivider.module.scss";

export default function VerticalDividerExample(): ReactElement {
  return (
    <AppBar theme="surface" className={styles.container}>
      <FavoriteIcon />
      <Divider vertical />
      <AppBarTitle>Title</AppBarTitle>
    </AppBar>
  );
}
