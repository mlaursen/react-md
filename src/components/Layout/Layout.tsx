import { useToggle } from "@react-md/core";
import { Layout as RMDLayout, useLayoutNavigation } from "@react-md/layout";
import type { ListElement } from "@react-md/list";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";
import { useCallback, useRef } from "react";

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
        ...useLayoutNavigation({
          navItems,
          pathname,
          linkComponent: UnstyledLink,
          defaultExpandedIds: ["form"],
        }),
        treeRef,
      }}
      navProps={{
        onEnter: focus,
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
