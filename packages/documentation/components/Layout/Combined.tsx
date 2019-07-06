import React, { Fragment, FC, useEffect } from "react";
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
        tabIndex={-1}
      >
        <TableOfContents pathname={router.pathname} />
        {children}
      </main>
    </Fragment>
  );
};

export default withRouter(Combined);
