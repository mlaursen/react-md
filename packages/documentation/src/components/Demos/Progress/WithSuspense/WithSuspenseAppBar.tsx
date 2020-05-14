import React, { FC } from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { AddSVGIcon, ShareSVGIcon } from "@react-md/material-icons";

import {
  ClosePhone,
  OptionsAction,
  PhoneAppBar,
  SearchAction,
} from "components/Phone";

import styles from "./WithSuspenseAppBar.module.scss";

const WithSuspenseAppBar: FC = () => (
  <PhoneAppBar height="prominent" theme="primary">
    <AppBar component="div" theme="clear">
      <ClosePhone />
      <AppBarAction first id="with-suspense-share" aria-label="Share">
        <ShareSVGIcon />
      </AppBarAction>
      <SearchAction first={false} />
      <OptionsAction />
    </AppBar>
    <AppBar component="div" theme="clear">
      <AppBarTitle keyline>My files</AppBarTitle>
    </AppBar>
    <Button
      id="with-suspense-add"
      aria-label="Add"
      themeType="contained"
      buttonType="icon"
      theme="clear"
      className={styles.button}
    >
      <AddSVGIcon />
    </Button>
  </PhoneAppBar>
);

export default WithSuspenseAppBar;
