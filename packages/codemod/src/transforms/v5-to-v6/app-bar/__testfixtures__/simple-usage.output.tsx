import type { ReactElement } from "react";
import {
  AppBar,
  AppBarTitle,
  Button,
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
          <Button id={`simple-usage-nav-${i}`} aria-label="Navigation">
            <MenuSVGIcon />
          </Button>
          <AppBarTitle
            id={`simple-usage-title-${i}`}
            className="rmd-typography--capitalize"
          >
            {theme}
          </AppBarTitle>
          <Button id={`simple-usage-search-${i}`} aria-label="Search">
            <SearchSVGIcon />
          </Button>
          <Button id={`simple-usage-kebab-${i}`} aria-label="Actions">
            <MoreVertSVGIcon />
          </Button>
        </AppBar>
      ))}
    </Container>
  );
}
