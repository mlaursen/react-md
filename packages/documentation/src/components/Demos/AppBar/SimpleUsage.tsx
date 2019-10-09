import React, { FC } from "react";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
  AppBarTheme,
} from "@react-md/app-bar";
import {
  MenuSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";

import Container from "./Container";

const themes: AppBarTheme[] = ["primary", "secondary", "default", "clear"];

const SimpleUsage: FC = () => (
  <Container>
    {themes.map((theme, i) => (
      <AppBar id={`simple-usage-app-bar-${i}`} theme={theme} key={theme}>
        <AppBarNav id={`simple-usage-nav-${i}`} aria-label="Navigation">
          <MenuSVGIcon />
        </AppBarNav>
        <AppBarTitle
          id={`simple-usage-title-${i}`}
          className="rmd-typography--capitalize"
        >
          {theme}
        </AppBarTitle>
        <AppBarAction id={`simple-usage-search-${i}`} first aria-label="Search">
          <SearchSVGIcon />
        </AppBarAction>
        <AppBarAction id={`simple-usage-kebab-${i}`} last aria-label="Actions">
          <MoreVertSVGIcon />
        </AppBarAction>
      </AppBar>
    ))}
  </Container>
);

export default SimpleUsage;
