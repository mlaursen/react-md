import { Layout as RMDLayout, useLayoutNavigation } from "@react-md/layout";
import { useRouter } from "next/router";
import type { ReactElement, ReactNode } from "react";

import { UnstyledLink } from "src/components/UnstyledLink";

import { MainActions } from "./MainActions";
import { navItems } from "./navItems";

export interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout(props: LayoutProps): ReactElement {
  const { pathname } = useRouter();
  const { title, children } = props;
  return (
    <RMDLayout
      appBarProps={{
        children: <MainActions />,
      }}
      title={title}
      treeProps={useLayoutNavigation(navItems, pathname, UnstyledLink)}
      phoneLayout="temporary"
      tabletLayout="temporary"
      desktopLayout="toggleable"
      largeDesktopLayout="toggleable"
      landscapeTabletLayout="temporary"
    >
      {children}
    </RMDLayout>
  );
}
