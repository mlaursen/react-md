"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { Main } from "@react-md/core/layout/Main";
import {
  useExpandableLayout,
  type ExpandableLayoutOptions,
} from "@react-md/core/layout/useExpandableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { usePathname } from "next/navigation.js";
import { Suspense, type ReactElement } from "react";
import { ExampleNavigation } from "./ExampleNavigation.jsx";
import { type ExampleLayoutProps } from "./layouts.js";

export interface ExpandableLayoutExampleProps
  extends ExampleLayoutProps,
    Omit<ExpandableLayoutOptions, "pathname"> {}

export function ExpandableLayoutExample(
  props: ExpandableLayoutExampleProps
): ReactElement {
  const { layout, children, ...options } = props;

  const pathname = usePathname();
  const {
    temporary,
    persistent,
    temporaryNavProps,
    navToggleProps,
    appBarProps,
    mainProps,
    expandableNavProps,
  } = useExpandableLayout({ pathname, ...options });

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Expandable Layout Example</AppBarTitle>
      </AppBar>
      {persistent && (
        <LayoutNav {...expandableNavProps}>
          <Suspense>
            <ExampleNavigation layout={layout} />
          </Suspense>
        </LayoutNav>
      )}
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <Suspense>
            <ExampleNavigation layout={layout} />
          </Suspense>
        </Sheet>
      )}
      <Main {...mainProps}>{children}</Main>
    </>
  );
}
