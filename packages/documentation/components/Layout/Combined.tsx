import React, { Fragment, FunctionComponent, useEffect } from "react";
import cn from "classnames";
import { useAppSizeContext } from "@react-md/sizing";
import { Sheet } from "@react-md/sheet";
import { useToggle } from "@react-md/utils";

import Header from "./Header";
import NavigationTree from "./NavigationTree";

export interface CombinedProps {
  title: string;
}

const Combined: FunctionComponent<CombinedProps> = ({ title, children }) => {
  const { isPhone, isTablet, isDesktop } = useAppSizeContext();
  const { toggled, disable, toggle, setToggled } = useToggle(isDesktop);
  useEffect(() => {
    if (toggled !== isDesktop) {
      setToggled(isDesktop);
    }
  }, [isDesktop, isTablet, isPhone]);

  return (
    <Fragment>
      <Header title={title} toggle={toggle} isDesktop={isDesktop} />
      <Sheet
        id="main-navigation"
        visible={toggled}
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

export default Combined;
