import { useToggle } from "@react-md/core";
import { Layout as RMDLayout, useLayoutNavigation } from "@react-md/layout";
import type { ListElement } from "@react-md/list";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { useCallback } from "react";

import { UnstyledLink } from "src/components/UnstyledLink";
import { KeyboardShortcuts } from "./KeyboardShortcuts";

import { MainActions } from "./MainActions";
import { navItems } from "./navItems";

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

  const focus = useCallback((instance: ListElement | null) => {
    // since I don't have anything else in the main navigation panel for now and
    // I have a temporary layout, just focus the tree so I can quickly jump to
    // other pages
    instance?.focus();
  }, []);

  return (
    <RMDLayout
      appBarProps={{
        children: (
          <MainActions
            showConfiguration={showConfiguration}
            hideConfiguration={hideConfiguration}
            configurationVisible={configurationVisible}
          />
        ),
      }}
      title={title}
      treeProps={{
        ...useLayoutNavigation(navItems, pathname, UnstyledLink),
        treeRef: focus,
      }}
      phoneLayout="temporary"
      tabletLayout="temporary"
      desktopLayout="temporary"
      largeDesktopLayout="temporary"
      landscapeTabletLayout="temporary"
    >
      <KeyboardShortcuts showConfiguration={showConfiguration} />
      {children}
    </RMDLayout>
  );
}
