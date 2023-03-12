import type { ListElement } from "@react-md/core";
import {
  Layout as RMDLayout,
  NoSsr,
  Sheet,
  Snackbar,
  useLayoutNavigation,
  useTheme,
  useToggle,
} from "@react-md/core";
import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useRef } from "react";
import { UnstyledLink } from "src/components/UnstyledLink";
import { AppToastRenderer } from "./AppToastRenderer";
import styles from "./Layout.module.scss";
import { MainActions } from "./MainActions";
import { navItems } from "./navItems";
import { NavWindowSplitter } from "./NavWindowSplitter";
import { WebsiteConfiguration } from "./WebsiteConfiguration";
import {
  useWebsiteConfigurationProvider,
  WebsiteConfigurationProvider,
} from "./WebsiteConfigurationProvider";

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
  const treeRef = useRef<ListElement>(null);
  const focus = useCallback(() => {
    const instance = treeRef.current;
    if (!instance) {
      return;
    }

    instance.focus();
    const activeItem = instance.querySelector<HTMLLIElement>(
      '[aria-selected="true"]'
    );

    if (!activeItem) {
      return;
    }

    activeItem.scrollIntoView({
      block: "center",
    });
  }, []);
  const context = useWebsiteConfigurationProvider();
  const {
    phoneLayout,
    tabletLayout,
    desktopLayout,
    largeDesktopLayout,
    landscapeTabletLayout,
  } = context;
  const { primaryColor } = useTheme();

  return (
    <WebsiteConfigurationProvider value={context}>
      <Head>
        <meta name="theme-color" content={primaryColor} />
      </Head>
      <RMDLayout
        appBarProps={{
          children: <MainActions showConfiguration={showConfiguration} />,
        }}
        title={title}
        treeProps={{
          ...useLayoutNavigation({
            navItems,
            pathname,
            linkComponent: UnstyledLink,
            defaultExpandedIds: ["/form", "/transition"],
          }),
          treeRef,
        }}
        navProps={{
          onEnter: focus,
          className: styles.nav,
        }}
        phoneLayout={phoneLayout}
        tabletLayout={tabletLayout}
        desktopLayout={desktopLayout}
        largeDesktopLayout={largeDesktopLayout}
        landscapeTabletLayout={landscapeTabletLayout}
        defaultToggleableVisible
      >
        <NoSsr>
          <NavWindowSplitter />
        </NoSsr>
        {children}
      </RMDLayout>
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
    </WebsiteConfigurationProvider>
  );
}
