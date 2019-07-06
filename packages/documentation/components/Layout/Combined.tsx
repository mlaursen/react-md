import React, { Fragment, FC, useEffect, useRef } from "react";
import cn from "classnames";
import { SingletonRouter, withRouter } from "next/router";
import { AppBar, AppBarTitle, AppBarAction } from "@react-md/app-bar";
import { ArrowBackSVGIcon } from "@react-md/material-icons";
import { Sheet } from "@react-md/sheet";
import { bem } from "@react-md/theme";
import { useToggle, useScrollLock } from "@react-md/utils";

import useAppSizeContext from "./useAppSizeContext";
import Header from "./Header";
import NavigationTree from "./NavigationTree";
import TableOfContents from "components/TableOfContents";
import { useInteractionModeContext } from "@react-md/states";

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
  const {
    toggled: visible,
    disable,
    toggle,
    setToggled: setVisible,
  } = useToggle(isDesktop);

  useEffect(() => {
    if (visible !== isDesktop) {
      setVisible(isDesktop);
    }
  }, [isDesktop, isTablet, isPhone]);

  useEffect(() => {
    if (visible && !inline) {
      setVisible(false);
    }
  }, [router.pathname]);

  useScrollLock(visible && isPhone);
  const inline = isDesktop || isLandscapeTablet;
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
  let mainTabIndex: number;
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
            <AppBarAction first onClick={toggle}>
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
