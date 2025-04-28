import type { ReactElement } from "react";
import {
  AppBar,
  AppBarAction,
  AppBarNav,
  AppBarTitle,
  MenuSVGIcon,
  MoreVertSVGIcon,
  SearchSVGIcon,
  type AppBarTheme,
} from "react-md";

import Container from "./Container";

const themes: AppBarTheme[] = ["primary", "secondary", "default", "clear"];

export default function Demo(): ReactElement {
  return (
    <Container>
      {themes.map((theme, i) => (
        <AppBar id={`simple-usage-app-bar-${i}`} theme={theme} key={theme}>
          <AppBarNav
            id={`simple-usage-nav-${i}`}
            aria-label="Navigation"
            inheritColor
          >
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
