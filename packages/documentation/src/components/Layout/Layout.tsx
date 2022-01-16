import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { ConfiguredIcons } from "@react-md/icon";
import {
  Configuration,
  Layout as RMDLayout,
  LayoutConfiguration,
  useLayoutNavigation,
} from "@react-md/layout";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  ErrorOutlineSVGIcon,
  FileUploadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
} from "@react-md/material-icons";
import { useCrossFadeTransition } from "@react-md/transition";
import { AppSizeListenerProps } from "@react-md/utils";

import {
  CodePreference,
  CodePreferenceProvider,
} from "components/CodePreference";
import { IdProvider } from "components/IdProvider";
import LinkUnstyled from "components/LinkUnstyled";
import TableOfContents from "components/TableOfContents";
import { TOCVisibilityProvider } from "components/TableOfContents/VisibilityContext";
import navItems from "constants/navItems";

import Actions from "./Actions";
import { Provider } from "./fixedAppBarContext";
import NavHeaderTitle from "./NavHeaderTitle";

export interface LayoutProps
  extends Required<Pick<AppSizeListenerProps, "defaultSize">> {
  title: string;
  pathname: string;
  children: ReactNode;
  defaultPreference: CodePreference;
}

const icons: ConfiguredIcons = {
  back: <KeyboardArrowLeftSVGIcon />,
  checkbox: <CheckBoxSVGIcon />,
  dropdown: <ArrowDropDownSVGIcon />,
  download: <FileUploadSVGIcon />,
  expander: <KeyboardArrowDownSVGIcon />,
  error: <ErrorOutlineSVGIcon />,
  forward: <KeyboardArrowRightSVGIcon />,
  menu: <MenuSVGIcon />,
  notification: <NotificationsSVGIcon />,
  radio: <RadioButtonCheckedSVGIcon />,
  password: <RemoveRedEyeSVGIcon />,
  selected: <CheckSVGIcon />,
  sort: <ArrowUpwardSVGIcon />,
};

let devLayoutConf: LayoutConfiguration | undefined;
if (process.env.NODE_ENV !== "production") {
  devLayoutConf = {
    landscapeTabletLayout: "temporary",
    desktopLayout: "temporary",
    largeDesktopLayout: "temporary",
  };
}

export default function Layout({
  children,
  title,
  pathname,
  defaultSize,
  defaultPreference,
}: LayoutProps): ReactElement {
  const [elevated, setElevated] = useState(pathname !== "/");
  const rendered = useRef(false);
  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      return;
    }

    setElevated(pathname !== "/");
  }, [pathname]);

  const prevPathname = useRef(pathname);
  const { elementProps, transitionTo } = useCrossFadeTransition();
  useEffect(() => {
    if (prevPathname.current === pathname) {
      return;
    }

    // since the sandbox route is a full page modal, don't want to transition
    // to make it appear smoother between the two
    const isTransitionable =
      !prevPathname.current.startsWith("/sandbox") &&
      !pathname.startsWith("/sandbox");

    prevPathname.current = pathname;
    if (isTransitionable) {
      transitionTo("enter");
    }
  }, [pathname, transitionTo]);

  return (
    <Configuration defaultSize={defaultSize} icons={icons} disableRipple>
      <TOCVisibilityProvider pathname={pathname}>
        <IdProvider>
          <CodePreferenceProvider defaultPreference={defaultPreference}>
            <RMDLayout
              appBarProps={{
                fixedElevation: elevated,
                children: <Actions />,
              }}
              title={title.replace("react-md@v2 - ", "")}
              mainProps={elementProps}
              treeProps={useLayoutNavigation(
                navItems,
                // I don't add each blog to the navigation tree, but still want to
                // show that a blog is being viewed
                pathname.replace(/^\/blog.*$/, "/blog"),
                LinkUnstyled
              )}
              navHeaderProps={{ children: <NavHeaderTitle /> }}
              {...devLayoutConf}
            >
              <TableOfContents pathname={pathname} />
              <Provider value={setElevated}>{children}</Provider>
            </RMDLayout>
          </CodePreferenceProvider>
        </IdProvider>
      </TOCVisibilityProvider>
    </Configuration>
  );
}
