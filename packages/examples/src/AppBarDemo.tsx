import React, { FunctionComponent } from "react";
import {
  AppBar,
  AppBarTitle,
  AppBarNav,
  AppBarAction,
} from "@react-md/app-bar";
import { MenuSVGIcon, MoreVertSVGIcon } from "@react-md/material-icons";
import { TextContainer, Text } from "@react-md/typography";

const AppBarDemo: FunctionComponent = () => (
  <TextContainer>
    <Text type="headline-3">AppBar Demo</Text>
    <AppBar>
      <AppBarNav id="app-bar-nav-1">
        <MenuSVGIcon />
      </AppBarNav>
      <AppBarTitle>Hello, world!</AppBarTitle>
      <AppBarAction first id="app-bar-action-1">
        <MoreVertSVGIcon />
      </AppBarAction>
    </AppBar>
    <AppBar theme="secondary">
      <AppBarTitle>Hello, world!</AppBarTitle>
    </AppBar>
  </TextContainer>
);

export default AppBarDemo;
