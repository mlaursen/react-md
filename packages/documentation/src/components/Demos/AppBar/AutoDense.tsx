import React, { FC } from "react";
import { AppBar, AppBarNav } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";

import AppBarTitle from "components/AppBarTitle";

import Container from "./Container";
import styles from "./AutoDense.module.scss";

const AutoDense: FC = () => (
  <Container className={styles.container}>
    <AppBar id="auto-dense-app-bar">
      <AppBarNav id="auto-dense-app-bar-nav" aria-label="Navigation">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Auto Dense</AppBarTitle>
    </AppBar>
    <AppBar
      id="auto-prominent-dense-app-bar"
      className={styles.prominent}
      height="prominent"
    >
      <AppBar>
        <AppBarNav
          id="auto-prominent-dense-app-bar-nav"
          aria-label="Navigation"
        >
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle>Auto Dense and prominent</AppBarTitle>
      </AppBar>
    </AppBar>
  </Container>
);

export default AutoDense;
