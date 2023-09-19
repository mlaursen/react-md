"use client";
import {
  Button,
  LayoutAppBar,
  LayoutNav,
  Main,
  Sheet,
  useExpandableLayout,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import type { ReactElement, ReactNode } from "react";
import { Configuration } from "./Configuration.jsx";
import { GithubLink } from "./GithubLink.jsx";
import { Navigation } from "./Navigation.jsx";
import styles from "./RootLayout.module.scss";
import type { RootLayoutTitleProps } from "./RootLayoutTitle.jsx";
import { RootLayoutTitle } from "./RootLayoutTitle.jsx";
import { Search } from "./Search.jsx";

export interface RootLayoutProps {
  isMac: boolean;
  titleProps: RootLayoutTitleProps;
  children: ReactNode;
}

export function RootLayout(props: RootLayoutProps): ReactElement {
  const { children, isMac, titleProps } = props;
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
      <LayoutAppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <RootLayoutTitle {...titleProps} />
        <Search isMac={isMac} />
        <GithubLink />
        <Configuration />
      </LayoutAppBar>
      <LayoutNav {...expandableNavProps} className={styles.navigation}>
        <Navigation />
      </LayoutNav>
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <Navigation />
        </Sheet>
      )}
      <Main {...mainProps} className={cnb(styles.main, mainProps.className)}>
        {children}
      </Main>
    </>
  );
}
