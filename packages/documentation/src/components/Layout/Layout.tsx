import React, { FC, useState } from "react";
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
  ArrowUpwardSVGIcon,
} from "@react-md/material-icons";
import { AppSizeListenerProps } from "@react-md/utils";

import LinkUnstyled from "components/LinkUnstyled";
import TableOfContents from "components/TableOfContents";
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";
import navItems from "constants/navItems";

import Actions from "./Actions";
import "./Layout.scss";
import NavHeaderTitle from "./NavHeaderTitle";
import { Provider } from "./fixedAppBarContext";

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
  sort: <ArrowUpwardSVGIcon />,
};

const Layout: FC<LayoutProps> = ({
  children,
  title,
  pathname,
  defaultSize,
}) => {
  const [fixedAppBarElevation, setFixedAppBarElevation] = useState(
    pathname === "/"
  );

  return (
    <Configuration defaultSize={defaultSize} icons={icons}>
      <TOCVisibilityProvider pathname={pathname}>
        <RMDLayout
          {...useLayoutNavigation(navItems, pathname)}
          appBarTitle={title.replace("react-md@v2 - ", "")}
          appBarAfterNav
          fixedAppBarElevation={fixedAppBarElevation}
          navHeaderTitle={<NavHeaderTitle />}
          navHeaderClassName="layout-nav-header"
          appBarChildren={<Actions />}
          linkComponent={LinkUnstyled}
        >
          <TableOfContents pathname={pathname} />
          <Provider value={setFixedAppBarElevation}>{children}</Provider>
        </RMDLayout>
      </TOCVisibilityProvider>
    </Configuration>
  );
};

export default Layout;
