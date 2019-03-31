import React from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { AddSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { bem } from "@react-md/theme";

import Button from "components/Button";
import {
  ClosePhone,
  OptionsAction,
  PhoneAppBar,
  SearchAction,
} from "components/Phone";

const block = bem("progress-suspense");

const WithSuspenseAppBar = () => (
  <PhoneAppBar prominent theme="primary">
    <AppBar component="div" theme="clear">
      <ClosePhone />
      <AppBarAction first id="with-suspense-share">
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
      themeType="contained"
      buttonType="icon"
      theme="clear"
      className={block("add")}
    >
      <AddSVGIcon />
    </Button>
  </PhoneAppBar>
);

export default WithSuspenseAppBar;
