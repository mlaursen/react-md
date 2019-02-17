import React, { FunctionComponent } from "react";
import { AppBar, AppBarTitle, AppBarNav } from "@react-md/app-bar";
import { MenuSVGIcon } from "@react-md/material-icons";

import ToggleRTL from "./ToggleRTL";
import ToggleTheme from "./ToggleTheme";

interface Props {
  title: string;
}

const Header: FunctionComponent<Props> = ({ title }) => (
  <AppBar id="main-app-bar" fixed>
    <AppBarNav id="main-nav-toggle">
      <MenuSVGIcon />
    </AppBarNav>
    <AppBarTitle>{title}</AppBarTitle>
    <ToggleTheme />
    <ToggleRTL />
  </AppBar>
);

export default Header;
