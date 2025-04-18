import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { Main } from "@react-md/core/layout/Main";
import { useExpandableLayout } from "@react-md/core/layout/useExpandableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { type ReactElement, type ReactNode } from "react";

import { MainNavigation } from "./MainNavigation.tsx";

export interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({
  children,
}: Readonly<RootLayoutProps>): ReactElement {
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
      <Main {...mainProps}>{children}</Main>
    </>
  );
}
