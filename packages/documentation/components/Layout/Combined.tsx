import React, { Fragment, FunctionComponent, useEffect } from "react";
import cn from "classnames";
import { SingletonRouter, withRouter } from "next/router";
import { useAppSizeContext } from "@react-md/sizing";
import { Sheet } from "@react-md/sheet";
import { useToggle } from "@react-md/utils";
import { useScrollLock } from "@react-md/wia-aria";

import Header from "./Header";
import NavigationTree from "./NavigationTree";

export interface CombinedProps {
  title: string;
  router: SingletonRouter;
}

const Combined: FunctionComponent<CombinedProps> = ({
  title,
  children,
  router,
}) => {
  const { isPhone, isTablet, isDesktop } = useAppSizeContext();
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
    if (visible && isPhone) {
      setVisible(false);
    }
  }, [router.pathname]);

  useScrollLock(visible && isPhone);

  return (
    <Fragment>
      <Header title={title} toggle={toggle} isDesktop={isDesktop} />
      <Sheet
        id="main-navigation"
        visible={visible}
        onRequestClose={disable}
        position="left"
        overlay={!isDesktop}
        inline={isDesktop}
        className={cn("layout__nav", {
          "layout__nav--desktop": isDesktop,
        })}
        component="nav"
        mountOnEnter={false}
        unmountOnExit={false}
      >
        <NavigationTree />
      </Sheet>
      <main
        id="main-content"
        className={cn("layout__main", {
          "layout__main--desktop": isDesktop,
        })}
      >
        {children}
      </main>
    </Fragment>
  );
};

export default withRouter(Combined);
