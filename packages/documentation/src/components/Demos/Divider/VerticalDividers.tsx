import { ReactElement } from "react";
import { AppBar } from "@react-md/app-bar";
import { VerticalDivider } from "@react-md/divider";
import { Typography } from "@react-md/typography";

import styles from "./VerticalDividers.module.scss";

export default function VerticalDividers(): ReactElement {
  return (
    <AppBar theme="default">
      <img
        src="https://picsum.photos/80/48?image=815"
        alt="Logo"
        className={styles.logo}
      />
      <VerticalDivider />
      <Typography type="headline-5">Company Name</Typography>
      <VerticalDivider maxHeight={0.6} />
    </AppBar>
  );
}
