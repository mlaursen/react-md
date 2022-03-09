import type { ReactElement } from "react";
import type { AppBarTheme } from "@react-md/app-bar";
import {
  AppBar,
  AppBarNav,
  AppBarTitle,
  AppBarAction,
} from "@react-md/app-bar";
import {
  MenuSVGIcon,
  SearchSVGIcon,
  MoreVertSVGIcon,
} from "@react-md/material-icons";

import Container from "./Container";

const themes: AppBarTheme[] = ["primary", "secondary", "default", "clear"];

export default function SimpleUsage(): ReactElement {
  return (
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
          <AppBarAction
            id={`simple-usage-search-${i}`}
            first
            aria-label="Search"
          >
            <SearchSVGIcon />
          </AppBarAction>
          <AppBarAction
            id={`simple-usage-kebab-${i}`}
            last
            aria-label="Actions"
          >
            <MoreVertSVGIcon />
          </AppBarAction>
        </AppBar>
      ))}
    </Container>
  );
}
