import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { Main } from "@react-md/core/layout/Main";
import { useExpandableLayout } from "@react-md/core/layout/useExpandableLayout";
import { Link } from "@react-md/core/link/Link";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { TextContainer } from "@react-md/core/typography/TextContainer";
import { Typography } from "@react-md/core/typography/Typography";
import { type ReactElement } from "react";

import { MainNavigation } from "./MainNavigation.tsx";

export default function App(): ReactElement {
  const {
    temporary,
    appBarProps,
    expandableNavProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
  } = useExpandableLayout({
    pathname: "/",
    // fullHeightNav: "static",
    defaultExpanded: true,
  });

  return (
    <>
      <LayoutAppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>react-md with vite</AppBarTitle>
      </LayoutAppBar>
      {!temporary && (
        <LayoutNav {...expandableNavProps}>
          <MainNavigation />
        </LayoutNav>
      )}
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <MainNavigation />
        </Sheet>
      )}
      <Main {...mainProps}>
        <TextContainer>
          <Typography type="headline-2">ReactMD + Vite Starter</Typography>
          <Typography>
            See{" "}
            <Link href="https://next.react-md.dev" target="_blank">
              https://next.react-md.dev
            </Link>{" "}
            and{" "}
            <Link href="https://vite.dev" target="_blank">
              https://vite.dev
            </Link>{" "}
            for more information.
          </Typography>
        </TextContainer>
      </Main>
    </>
  );
}
