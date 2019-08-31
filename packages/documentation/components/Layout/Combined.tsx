import React, { Fragment, FC, useEffect } from "react";
import cn from "classnames";
import { SingletonRouter, withRouter } from "next/router";
import { AppBar, AppBarTitle, AppBarAction } from "@react-md/app-bar";
import { ArrowBackSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import {
  bem,
  useToggle,
  useScrollLock,
  useInteractionModeContext,
} from "@react-md/utils";

import TableOfContents from "components/TableOfContents";

import useAppSizeContext from "./useAppSizeContext";
import Header from "./Header";
import NavigationTree from "./NavigationTree";

export interface CombinedProps {
  title: string;
  router: SingletonRouter;
}

const block = bem("layout");

const Combined: FC<CombinedProps> = ({
  title: propTitle,
  children,
  router,
}) => {
  const { isPhone, isTablet, isDesktop, isLandscape } = useAppSizeContext();
  const isLandscapeTablet = isLandscape && isTablet;
  const inline = isDesktop || isLandscapeTablet;
  const [visible, , disable, toggle, setVisible] = useToggle(isDesktop);

  useEffect(() => {
    if (visible !== isDesktop) {
      setVisible(isDesktop);
    }
    // disabled since only want to update on media changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, isTablet, isPhone]);

  useEffect(() => {
    if (visible && !inline) {
      setVisible(false);
    }
    // disabled since only want to run on pathname changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  useScrollLock(visible && isPhone);
  let title = propTitle;
  if (propTitle.includes(" - ")) {
    title = title.substring(title.indexOf(" - ") + 3);
    if (isPhone && !router.pathname.includes("/packages/")) {
      const i = title.lastIndexOf("- ");
      if (i !== -1) {
        title = title.substring(i + 2);
      }
    }
  }

  // this makes it so that the SkipToMainContent button can still
  // focus the `<main>` element, but the `<main>` will no longer be
  // focused if the user clicks inside. This is super nice since one
  // of my bigger patterns is to click somewhere then press tab to
  // focus a specific element. Without this fix, the first element in
  // the `<main>` tag would be focused instead of the closest focusable
  // element to the click area.
  let mainTabIndex: number | undefined;
  if (useInteractionModeContext() === "keyboard") {
    mainTabIndex = -1;
  }

  return (
    <Fragment>
      <Header
        title={title}
        toggle={toggle}
        isPhone={isPhone}
        isDesktop={isDesktop}
        isSheetVisible={visible}
      />
      <Sheet
        id="main-navigation"
        visible={visible}
        onRequestClose={disable}
        position="left"
        overlay={!inline}
        inline={inline}
        className={cn(block("nav", { inline }))}
        component="nav"
        mountOnEnter={false}
        unmountOnExit={false}
      >
        {isLandscapeTablet && (
          <AppBar theme="clear" className={block("nav-header")}>
            <AppBarTitle id="main-navigation-title" className={block("title")}>
              {title}
            </AppBarTitle>
            <AppBarAction first onClick={toggle} aria-label="Hide Navigation">
              <ArrowBackSVGIcon />
            </AppBarAction>
          </AppBar>
        )}
        <NavigationTree />
      </Sheet>
      <main
        id="main-content"
        className={cn(
          block("main", {
            offset: inline && visible,
          })
        )}
        tabIndex={mainTabIndex}
      >
        <TableOfContents pathname={router.pathname} />
        {children}
      </main>
    </Fragment>
  );
};

export default withRouter(Combined);
