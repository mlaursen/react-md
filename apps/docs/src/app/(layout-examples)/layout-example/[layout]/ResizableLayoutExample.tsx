"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { LayoutWindowSplitter } from "@react-md/core/layout/LayoutWindowSplitter";
import { Main } from "@react-md/core/layout/Main";
import {
  type ResizableLayoutOptions,
  useResizableLayout,
} from "@react-md/core/layout/useResizableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { usePathname } from "next/navigation.js";
import { type ReactElement, Suspense } from "react";

import { ExampleNavigation } from "./ExampleNavigation.jsx";
import { type ExampleLayoutProps } from "./layouts.js";

export interface ResizableLayoutExampleProps
  extends ExampleLayoutProps,
    Omit<ResizableLayoutOptions, "pathname"> {}

export function ResizableLayoutExample(
  props: ResizableLayoutExampleProps
): ReactElement {
  const { layout, children, ...options } = props;

  const pathname = usePathname();
  const {
    temporary,
    persistent,
    appBarProps,
    navToggleProps,
    expandableNavProps,
    mainProps,
    temporaryNavProps,
    windowSplitterProps,
  } = useResizableLayout({ pathname, ...options });

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Resizable Layout Example</AppBarTitle>
      </AppBar>
      {persistent && (
        <>
          <LayoutNav {...expandableNavProps}>
            <Suspense>
              <ExampleNavigation layout={layout} />
            </Suspense>
          </LayoutNav>
          <LayoutWindowSplitter {...windowSplitterProps} />
        </>
      )}
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <nav aria-label="Navigation">
            <Suspense>
              <ExampleNavigation layout={layout} />
            </Suspense>
          </nav>
        </Sheet>
      )}
      <Main {...mainProps}>{children}</Main>
    </>
  );
}
