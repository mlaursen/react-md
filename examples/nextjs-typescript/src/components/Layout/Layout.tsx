import type { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  ConfigurableIcons,
  Configuration,
  ErrorOutlineSVGIcon,
  FileDownloadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  Layout as RMDLayout,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
  useLayoutNavigation,
} from "react-md";

import LinkUnstyled from "components/LinkUnstyled";
import navItems from "./navItems";

const icons: ConfigurableIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  download: <FileDownloadSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
  error: <ErrorOutlineSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
  menu: <MenuSVGIcon />,
  notification: <NotificationsSVGIcon />,
  password: <RemoveRedEyeSVGIcon />,
  radio: <RadioButtonCheckedSVGIcon />,
  selected: <CheckSVGIcon />,
  sort: <ArrowUpwardSVGIcon />,
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const { pathname } = useRouter();

  return (
    <Configuration icons={icons}>
      <RMDLayout
        tabletLayout="temporary"
        landscapeTabletLayout="temporary"
        desktopLayout="temporary"
        largeDesktopLayout="temporary"
        treeProps={useLayoutNavigation(navItems, pathname, LinkUnstyled)}
      >
        {children}
      </RMDLayout>
    </Configuration>
  );
}
