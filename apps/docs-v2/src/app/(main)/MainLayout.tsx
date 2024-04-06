"use client";
import { AppBar } from "@react-md/core/app-bar/AppBar";
import { AppBarTitle } from "@react-md/core/app-bar/AppBarTitle";
import { Button } from "@react-md/core/button/Button";
import { cssUtils } from "@react-md/core/cssUtils";
import { LayoutAppBar } from "@react-md/core/layout/LayoutAppBar";
import { LayoutNav } from "@react-md/core/layout/LayoutNav";
import { Main } from "@react-md/core/layout/Main";
import { useExpandableLayout } from "@react-md/core/layout/useExpandableLayout";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactElement, type ReactNode } from "react";
import styles from "./MainLayout.module.scss";
import { MainNavigation } from "./MainNavigation.jsx";

const isTableOfContentsRoute = (pathname: string): boolean =>
  pathname !== "/" && pathname !== "/components/material-icons-and-symbols";

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps): ReactElement {
  const pathname = usePathname();
  const {
    temporary,
    appBarProps,
    expandableNavProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
  } = useExpandableLayout({
    pathname,
    defaultExpanded: true,
    temporaryUntil: "desktop",
  });

  return (
    <>
      <LayoutAppBar
        {...appBarProps}
        className={cnb(
          appBarProps.className,
          cssUtils({ surfaceColor: "light" })
        )}
      >
        <Button {...navToggleProps} />
      </LayoutAppBar>
      <LayoutNav
        {...expandableNavProps}
        className={cssUtils({
          className: styles.navigation,
          backgroundColor: "current-color",
        })}
      >
        <MainNavigation />
      </LayoutNav>
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <AppBar theme="clear">
            <AppBarTitle>react-md</AppBarTitle>
          </AppBar>
          <MainNavigation className={styles.scrollable} />
        </Sheet>
      )}
      <Main
        {...mainProps}
        className={cnb(
          styles.main,
          isTableOfContentsRoute(pathname) && styles.mainGrid,
          mainProps.className
        )}
      >
        {children}
      </Main>
    </>
  );
}
