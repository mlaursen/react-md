import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Divider } from "@react-md/core/divider/Divider";
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
