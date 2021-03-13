import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { ConfiguredIcons } from "@react-md/icon";
import {
  Configuration,
  Layout as RMDLayout,
  useLayoutNavigation,
} from "@react-md/layout";
import {
  ArrowDropDownSVGIcon,
  ArrowUpwardSVGIcon,
  CheckBoxSVGIcon,
  CheckSVGIcon,
  ErrorOutlineSVGIcon,
  FileDownloadSVGIcon,
  KeyboardArrowDownSVGIcon,
  KeyboardArrowLeftSVGIcon,
  KeyboardArrowRightSVGIcon,
  MenuSVGIcon,
  NotificationsSVGIcon,
  RadioButtonCheckedSVGIcon,
  RemoveRedEyeSVGIcon,
} from "@react-md/material-icons";
import { ENTER, useCrossFade } from "@react-md/transition";
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
  download: <FileDownloadSVGIcon />,
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
  const [, transitionProps, dispatch] = useCrossFade();
  if (prevPathname.current !== pathname) {
    // since the sandbox route is a full page modal, don't want to transition
    // to make it appear smoother between the two
    const isTransitionable =
      !prevPathname.current.startsWith("/sandbox") &&
      !pathname.startsWith("/sandbox");

    prevPathname.current = pathname;
    if (isTransitionable) {
      dispatch(ENTER);
    }
  }

  return (
    <Configuration defaultSize={defaultSize} icons={icons}>
      <TOCVisibilityProvider pathname={pathname}>
        <IdProvider>
          <CodePreferenceProvider defaultPreference={defaultPreference}>
            <RMDLayout
              appBarProps={{
                fixedElevation: elevated,
                children: <Actions />,
              }}
              title={title.replace("react-md@v2 - ", "")}
              mainProps={transitionProps}
              treeProps={useLayoutNavigation(
                navItems,
                // I don't add each blog to the navigation tree, but still want to
                // show that a blog is being viewed
                pathname.replace(/^\/blog.*$/, "/blog"),
                LinkUnstyled
              )}
              navHeaderProps={{ children: <NavHeaderTitle /> }}
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
