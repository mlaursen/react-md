import React, { FC } from "react";
import {
  Configuration,
  Layout as RMDLayout,
  useLayoutNavigation,
} from "@react-md/layout";
import {
  MenuSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
} from "@react-md/material-icons";
import { AppSizeListenerProps } from "@react-md/utils";

import navItems from "constants/navItems";
import LinkUnstyled from "components/LinkUnstyled";
import TableOfContents from "components/TableOfContents";
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";

import "./Layout.scss";
import Actions from "./Actions";
import NavHeaderTitle from "./NavHeaderTitle";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
  pathname: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  title,
  pathname,
  defaultSize,
}) => (
  <Configuration defaultSize={defaultSize}>
    <TOCVisibilityProvider pathname={pathname}>
      <RMDLayout
        {...useLayoutNavigation(navItems, pathname)}
        appBarTitle={title.replace("react-md@v2 - ", "")}
        appBarAfterNav
        navHeaderTitle={<NavHeaderTitle />}
        navHeaderClassName="layout-nav-header"
        navIcon={<MenuSVGIcon />}
        hideNavIcon={<KeyboardArrowLeftSVGIcon />}
        expanderIcon={<KeyboardArrowDownSVGIcon />}
        appBarChildren={<Actions />}
        linkComponent={LinkUnstyled}
      >
        <TableOfContents pathname={pathname} />
        {children}
      </RMDLayout>
    </TOCVisibilityProvider>
  </Configuration>
);

export default Layout;
