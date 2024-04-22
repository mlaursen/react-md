"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { Main } from "@react-md/core/layout/Main";
import { useTemporaryLayout } from "@react-md/core/layout/useTemporaryLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { usePathname } from "next/navigation.js";
import { Suspense, type ReactElement } from "react";
import { ExampleNavigation } from "./ExampleNavigation.jsx";
import { type ExampleLayoutProps } from "./layouts.js";

export function TemporaryLayoutExample(
  props: ExampleLayoutProps
): ReactElement {
  const { layout, children } = props;
  const pathname = usePathname();
  const { appBarProps, mainProps, temporaryNavProps, navToggleProps } =
    useTemporaryLayout({ pathname });

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Temporary Navigation Example</AppBarTitle>
      </AppBar>
      <Main {...mainProps}>{children}</Main>
      <Sheet {...temporaryNavProps}>
        <Suspense>
          <ExampleNavigation layout={layout} />
        </Suspense>
      </Sheet>
    </>
  );
}
