import React, { FC } from "react";
import { AppBar } from "@react-md/app-bar";
import { VerticalDivider } from "@react-md/divider";
import { Text } from "@react-md/typography";

import styles from "./VerticalDividers.module.scss";

const VerticalDividers: FC = () => (
  <AppBar theme="default">
    <img
      src="https://picsum.photos/80/48?image=815"
      alt="Logo"
      className={styles.logo}
    />
    <VerticalDivider />
    <Text type="headline-5">Company Name</Text>
    <VerticalDivider maxHeight={0.6} />
  </AppBar>
);

export default VerticalDividers;
