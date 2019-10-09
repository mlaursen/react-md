import React, { FC } from "react";
import { AppBar, AppBarAction, AppBarTitle } from "@react-md/app-bar";
import { Button } from "@react-md/button";
import { AddSVGIcon, ShareSVGIcon } from "@react-md/material-icons";
import { bem } from "@react-md/utils";

import {
  ClosePhone,
  OptionsAction,
  PhoneAppBar,
  SearchAction,
} from "components/Phone";

const block = bem("progress-suspense");

const WithSuspenseAppBar: FC = () => (
  <PhoneAppBar prominent theme="primary">
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
      className={block("add")}
    >
      <AddSVGIcon />
    </Button>
  </PhoneAppBar>
);

export default WithSuspenseAppBar;
