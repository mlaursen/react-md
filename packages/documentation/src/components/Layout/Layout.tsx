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

import { routesTree } from "constants/routesTree";
import TableOfContents from "components/TableOfContents";
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";

import Actions from "./Actions";

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
    <RMDLayout
      {...useLayoutNavigation(routesTree, pathname)}
      appBarTitle={title.replace("react-md - ", "")}
      navHeaderTitle="react-md"
      navIcon={<MenuSVGIcon />}
      hideNavIcon={<KeyboardArrowLeftSVGIcon />}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
      appBarChildren={<Actions />}
    >
      <TOCVisibilityProvider pathname={pathname}>
        <TableOfContents pathname={pathname} />
        {children}
      </TOCVisibilityProvider>
    </RMDLayout>
  </Configuration>
);

export default Layout;
