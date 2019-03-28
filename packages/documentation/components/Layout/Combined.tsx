import React, { Fragment, FunctionComponent, useEffect } from "react";
import cn from "classnames";
import { Sheet } from "@react-md/sheet";
import { useVisibility } from "@react-md/utils";
import { useAppSizeContext } from "./AppSize";
import Header from "./Header";
import NavigationTree from "./NavigationTree";

export interface CombinedProps {
  title: string;
}

const Combined: FunctionComponent<CombinedProps> = ({ title, children }) => {
  const context = useAppSizeContext();
  const { isDesktop, isTablet, isPhone } = context;
  const { visible, hide, toggle, setVisible } = useVisibility(isDesktop);
  useEffect(() => {
    if (visible !== isDesktop) {
      setVisible(isDesktop);
    }
  }, [isDesktop, isTablet, isPhone]);

  return (
    <Fragment>
      <Header title={title} toggle={toggle} isDesktop={isDesktop} />
      <Sheet
        id="main-navigation"
        visible={visible}
        onRequestClose={hide}
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
