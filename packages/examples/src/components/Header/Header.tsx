import React, { FunctionComponent } from "react";
import {
  AppBar,
  AppBarTitle,
  AppBarNav,
  AppBarAction,
} from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";

import ToggleRTL from "./ToggleRTL";
import ToggleTheme from "./ToggleTheme";

const Header: FunctionComponent = () => (
  <AppBar id="main-app-bar" fixed>
    <AppBarNav id="main-hamburger-menu">
      <MenuSVGIcon />
    </AppBarNav>
    <AppBarTitle>Hello, world!</AppBarTitle>
    <ToggleTheme />
    <ToggleRTL />
  </AppBar>
);

export default Header;
