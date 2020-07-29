import React, { ReactElement, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Layout as RMDLayout,
  Configuration,
  ConfigurableIcons,
  useLayoutNavigation,
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
  ArrowUpwardSVGIcon,
  CheckSVGIcon,
} from "react-md";

import navItems from "./navItems";

const icons: ConfigurableIcons = {
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
  selected: <CheckSVGIcon />,
  sort: <ArrowUpwardSVGIcon />,
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { pathname } = useLocation();

  return (
    <Configuration icons={icons}>
      <RMDLayout
        tabletLayout="temporary"
        landscapeTabletLayout="temporary"
        desktopLayout="temporary"
        largeDesktopLayout="temporary"
        treeProps={useLayoutNavigation(navItems, pathname, Link)}
      >
        {children}
      </RMDLayout>
    </Configuration>
  );
}
