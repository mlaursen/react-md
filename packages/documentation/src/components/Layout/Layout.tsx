import React, { FC } from "react";
import { ConfiguredIcons } from "@react-md/icon";
import {
  Configuration,
  Layout as RMDLayout,
  useLayoutNavigation,
} from "@react-md/layout";
import {
  ArrowDropDownSVGIcon,
  CheckBoxSVGIcon,
  FileDownloadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
} from "@react-md/material-icons";
import { AppSizeListenerProps } from "@react-md/utils";

import LinkUnstyled from "components/LinkUnstyled";
import TableOfContents from "components/TableOfContents";
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";
import navItems from "constants/navItems";

import Actions from "./Actions";
import "./Layout.scss";
import NavHeaderTitle from "./NavHeaderTitle";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
  pathname: string;
}

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
  download: <FileDownloadSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
  menu: <MenuSVGIcon />,
  notification: <NotificationsSVGIcon />,
  radio: <RadioButtonCheckedSVGIcon />,
  password: <RemoveRedEyeSVGIcon />,
};

const Layout: FC<LayoutProps> = ({
  children,
  title,
  pathname,
  defaultSize,
}) => (
  <Configuration defaultSize={defaultSize} icons={icons}>
    <TOCVisibilityProvider pathname={pathname}>
      <RMDLayout
        {...useLayoutNavigation(navItems, pathname)}
        appBarTitle={title.replace("react-md@v2 - ", "")}
        appBarAfterNav
        navHeaderTitle={<NavHeaderTitle />}
        navHeaderClassName="layout-nav-header"
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
