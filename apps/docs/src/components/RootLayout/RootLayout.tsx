"use client";
import { GithubLink } from "@/components/GithubLink.jsx";
import { WebsiteConfiguration } from "@/components/WebsiteConfiguration/WebsiteConfiguration.jsx";
import {
  Button,
  LayoutAppBar,
  LayoutNav,
  Main,
  Sheet,
  cssUtils,
  useExpandableLayout,
} from "@react-md/core";
import { cnb } from "cnbuilder";
import { usePathname } from "next/navigation.js";
import { type ReactElement, type ReactNode } from "react";
import { Navigation } from "./Navigation.jsx";
import styles from "./RootLayout.module.scss";
import {
  RootLayoutTitle,
  type RootLayoutTitleProps,
} from "./RootLayoutTitle.jsx";
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
      <LayoutAppBar
        {...appBarProps}
        className={cnb(
          appBarProps.className,
          cssUtils({ surfaceColor: "light" })
        )}
      >
        <Button {...navToggleProps} />
        <RootLayoutTitle {...titleProps} />
        <Search isMac={isMac} />
        <GithubLink />
        <WebsiteConfiguration />
      </LayoutAppBar>
      <LayoutNav {...expandableNavProps} className={styles.navigation}>
        <Navigation />
      </LayoutNav>
      {temporary && (
        <Sheet {...temporaryNavProps}>
          <Navigation />
        </Sheet>
      )}
      <Main
        {...mainProps}
        className={cnb(
          styles.main,
          pathname !== "/" && styles.mainGrid,
          mainProps.className
        )}
      >
        {children}
      </Main>
    </>
  );
}
