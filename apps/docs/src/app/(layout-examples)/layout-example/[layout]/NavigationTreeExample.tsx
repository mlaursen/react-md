"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { LayoutWindowSplitter } from "@react-md/core/layout/LayoutWindowSplitter";
import { Main } from "@react-md/core/layout/Main";
import { useResizableLayout } from "@react-md/core/layout/useResizableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { usePathname } from "next/navigation.js";
import { type ReactElement } from "react";
import { NavigationTree } from "./NavigationTree.jsx";
import styles from "./NavigationTreeExample.module.scss";
import { type ExampleLayoutProps } from "./layouts.js";

export function NavigationTreeExample(props: ExampleLayoutProps): ReactElement {
  const { layout, children } = props;
  const pathname = usePathname();
  const {
    temporary,
    persistent,
    temporaryNavProps,
    navToggleProps,
    appBarProps,
    mainProps,
    expandableNavProps,
    windowSplitterProps,
  } = useResizableLayout({ pathname, defaultExpanded: true });

  return (
    <>
      <AppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>Layout Tree Example</AppBarTitle>
      </AppBar>
      {persistent && (
        <>
          <LayoutNav {...expandableNavProps} className={styles.navigation}>
            <NavigationTree layout={layout} />
          </LayoutNav>
          <LayoutWindowSplitter {...windowSplitterProps} />
        </>
      )}
      {temporary && (
        <Sheet {...temporaryNavProps} className={styles.navigation}>
          <NavigationTree layout={layout} />
        </Sheet>
      )}
      <Main {...mainProps}>{children}</Main>
    </>
  );
}
