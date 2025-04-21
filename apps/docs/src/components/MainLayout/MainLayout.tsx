"use client";

import { useSsr } from "@react-md/core/SsrProvider";
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
import { type ReactElement, type ReactNode, useEffect } from "react";

import { WebsiteSearch } from "@/components/WebsiteSearch/WebsiteSearch.jsx";

import { GithubLink } from "../GithubLink.jsx";
import styles from "./MainLayout.module.scss";
import { MainNavigation } from "./MainNavigation.jsx";
import { MainTitle } from "./MainTitle.jsx";
import { VersionDropdown } from "./VersionDropdown.jsx";
import { WebsiteConfiguration } from "./WebsiteConfiguration.jsx";

const isThemeBuilderRoute = (pathname: string): boolean =>
  pathname === "/customization/theme-builder";

const isFullViewportRoute = (pathname: string): boolean =>
  isThemeBuilderRoute(pathname) ||
  pathname === "/components/material-icons-and-symbols";

const isTableOfContentsRoute = (pathname: string): boolean =>
  pathname !== "/" && !isFullViewportRoute(pathname);

export interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout(props: MainLayoutProps): ReactElement {
  const { children } = props;

  const pathname = usePathname();
  const ssr = useSsr();
  const {
    temporary,
    appBarProps,
    expandableNavProps,
    mainProps,
    navToggleProps,
    temporaryNavProps,
    collapseNavigation,
  } = useExpandableLayout({
    pathname,
    defaultExpanded: () => !isFullViewportRoute(pathname),
    temporaryUntil: "screen and (min-width: 1200px)",
  });
  useEffect(() => {
    if (isFullViewportRoute(pathname)) {
      collapseNavigation();
    }
  }, [collapseNavigation, pathname]);

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
        <MainTitle />
        <WebsiteSearch />
        <GithubLink />
        <WebsiteConfiguration />
      </LayoutAppBar>
      {(ssr || !temporary) && (
        <LayoutNav
          {...expandableNavProps}
          className={cssUtils({
            className: styles.navigation,
            backgroundColor: "current-color",
          })}
        >
          <MainNavigation />
        </LayoutNav>
      )}
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <AppBar theme="clear">
            <AppBarTitle>react-md</AppBarTitle>
            <VersionDropdown />
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
