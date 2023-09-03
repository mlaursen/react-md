import {
  AppBarTitle,
  Button,
  LayoutAppBar,
  LayoutNav,
  LayoutWindowSplitter,
  Main,
  NoSsr,
  Sheet,
  Snackbar,
  useAppSize,
  useResizableLayout,
  useTheme,
  useToggle,
} from "@react-md/core";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { AppToastRenderer } from "./AppToastRenderer";
import styles from "./Layout.module.scss";
import { MainActions } from "./MainActions";
import { Navigation } from "./Navigation";
import { WebsiteConfiguration } from "./WebsiteConfiguration";

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout(props: LayoutProps): ReactElement {
  const { pathname } = useRouter();
  const { title, children } = props;
  const {
    enable: showConfiguration,
    disable: hideConfiguration,
    toggled: configurationVisible,
  } = useToggle();
  const { primaryColor } = useTheme();
  const {
    appBarProps,
    mainProps,
    expandableNavProps,
    navToggleProps,
    temporaryNavProps,
    windowSplitterProps,
  } = useResizableLayout({
    pathname,
    defaultExpanded: true,
    fullHeightNav: true,
  });
  const { isPhone } = useAppSize();

  return (
    <>
      <Head>
        <meta name="theme-color" content={primaryColor} />
      </Head>
      <LayoutAppBar {...appBarProps}>
        <Button {...navToggleProps} />
        <AppBarTitle>{title}</AppBarTitle>
        <MainActions showConfiguration={showConfiguration} />
      </LayoutAppBar>
      <LayoutNav {...expandableNavProps} className={styles.navigation}>
        <Navigation pathname={pathname} />
      </LayoutNav>
      {isPhone && (
        <Sheet {...temporaryNavProps}>
          <Navigation pathname={pathname} />
        </Sheet>
      )}
      <NoSsr>
        <LayoutWindowSplitter {...windowSplitterProps} />
      </NoSsr>
      <Main {...mainProps}>{children}</Main>
      <Sheet
        aria-label="Configuration"
        visible={configurationVisible}
        onRequestClose={hideConfiguration}
        position="right"
        className={styles.sheet}
      >
        <WebsiteConfiguration />
      </Sheet>
      <Snackbar renderToast={AppToastRenderer} />
    </>
  );
}
