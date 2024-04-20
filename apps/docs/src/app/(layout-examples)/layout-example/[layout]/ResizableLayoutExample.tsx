"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { LayoutWindowSplitter } from "@react-md/core/layout/LayoutWindowSplitter";
import { Main } from "@react-md/core/layout/Main";
import {
  useResizableLayout,
  type ResizableLayoutOptions,
} from "@react-md/core/layout/useResizableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { Navigation } from "./Navigation.jsx";
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
      <LayoutNav {...expandableNavProps}>
        <Navigation layout={layout} />
      </LayoutNav>
      <LayoutWindowSplitter {...windowSplitterProps} />
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <Navigation layout={layout} />
        </Sheet>
      )}
      <Main {...mainProps}>{children}</Main>
    </>
  );
}
